import * as vscode from 'vscode';
import {getIconData, Icon} from '../utils/iconData';

interface IconQuickPickItem extends vscode.QuickPickItem {
    char: string;
    iconObj?: Icon;
}

export const RECENT_ICONS_KEY = 'nerdy.recentIcons';
const RECENT_ICONS_LIMIT = 100;
const INITIAL_LOAD_LIMIT = 100;

const itemCache = new Map<string, IconQuickPickItem>();
let cachedAllItems: IconQuickPickItem[] | null = null;

function getIconUri(char: string, color: string): vscode.Uri {
    const svgSize = 24;
    const fontSize = 16;
    const fontFamily =
        "'FiraCode Nerd Font', 'FiraCode Nerd Font Mono', 'JetBrainsMono Nerd Font', 'JetBrainsMono Nerd Font Mono', 'CaskaydiaCove Nerd Font', 'CaskaydiaCove Nerd Font Mono', 'MesloLGS NF', 'Symbols Nerd Font', 'Symbols Nerd Font Mono', 'Hack Nerd Font', 'Hack Nerd Font Mono', 'DejaVuSansMono Nerd Font', 'DejaVuSansMono Nerd Font Mono', 'monospace'";

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
            <text
                x="50%"
                y="50%"
                font-family="${fontFamily}"
                font-size="${fontSize}"
                text-anchor="middle"
                dominant-baseline="central"
                fill="${color}"
            >
                ${char}
            </text>
        </svg>
    `.trim();

    return vscode.Uri.parse(
        `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
    );
}

function getCachedIconItem(icon: Icon): IconQuickPickItem {
    let item = itemCache.get(icon.name);
    if (!item) {
        item = {
            label: icon.name,
            description: icon.code,
            char: icon.char,
            iconObj: icon,
            iconPath: {
                light: getIconUri(icon.char, '#333333'),
                dark: getIconUri(icon.char, '#CCCCCC')
            }
        };
        itemCache.set(icon.name, item);
    }
    return item;
}

export function preloadIconData() {
    globalThis.setTimeout(() => {
        if (!cachedAllItems) {
            cachedAllItems = getIconData().map(getCachedIconItem);
        }
    }, 100);
}

export function updateRecentIcons(
    context: vscode.ExtensionContext,
    icon: Icon
) {
    let recentIcons = context.globalState.get<Icon[]>(RECENT_ICONS_KEY, []);
    recentIcons = recentIcons.filter((i) => i.name !== icon.name);
    recentIcons.unshift(icon);
    if (recentIcons.length > RECENT_ICONS_LIMIT) {
        recentIcons.pop();
    }
    context.globalState.update(RECENT_ICONS_KEY, recentIcons);
}

function handleIconSelection(
    selection: IconQuickPickItem | undefined,
    context: vscode.ExtensionContext
) {
    if (selection && selection.iconObj) {
        const iconChar = selection.char;
        vscode.env.clipboard.writeText(iconChar);
        updateRecentIcons(context, selection.iconObj);

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, iconChar);
            });
        } else {
            vscode.window.showErrorMessage(
                'No active editor found to insert the icon.'
            );
        }
    }
}

export function insertIconCommand(context: vscode.ExtensionContext) {
    const picker = vscode.window.createQuickPick<IconQuickPickItem>();
    picker.placeholder = 'Select an icon to insert';
    picker.matchOnDescription = true;

    const recentIcons = context.globalState.get<Icon[]>(RECENT_ICONS_KEY, []);
    const recentItems = recentIcons.map(getCachedIconItem);

    const initialItems: (IconQuickPickItem | vscode.QuickPickItem)[] = [];
    if (recentItems.length > 0) {
        initialItems.push({
            label: 'Recently Used',
            kind: vscode.QuickPickItemKind.Separator
        });
        initialItems.push(...recentItems);
    }

    initialItems.push({
        label: 'All Icons',
        kind: vscode.QuickPickItemKind.Separator
    });

    const allIcons = getIconData();
    const quickStartItems = allIcons
        .slice(0, INITIAL_LOAD_LIMIT)
        .map(getCachedIconItem);

    picker.items = [...initialItems, ...quickStartItems] as IconQuickPickItem[];

    if (!cachedAllItems) {
        picker.busy = true;
    }

    picker.show();

    picker.onDidAccept(() => {
        const selection = picker.selectedItems[0];
        handleIconSelection(selection, context);
        picker.hide();
    });

    picker.onDidHide(() => picker.dispose());

    globalThis.setTimeout(() => {
        if (!cachedAllItems) {
            cachedAllItems = allIcons.map(getCachedIconItem);
        }
        picker.items = [
            ...initialItems,
            ...cachedAllItems
        ] as IconQuickPickItem[];
        picker.busy = false;
    }, 10);
}

export function insertRecentIconCommand(context: vscode.ExtensionContext) {
    const recentIcons = context.globalState.get<Icon[]>(RECENT_ICONS_KEY, []);

    if (recentIcons.length === 0) {
        vscode.window.showInformationMessage('No recently used icons found.');
        return;
    }

    const picker = vscode.window.createQuickPick<IconQuickPickItem>();
    picker.placeholder = 'Select a recently used icon';
    picker.matchOnDescription = true;
    picker.items = recentIcons.map(getCachedIconItem);

    picker.show();

    picker.onDidAccept(() => {
        const selection = picker.selectedItems[0];
        handleIconSelection(selection, context);
        picker.hide();
    });

    picker.onDidHide(() => picker.dispose());
}
