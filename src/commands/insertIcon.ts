import * as vscode from 'vscode';
import {getIconData, Icon} from '../utils/iconData';

interface IconQuickPickItem extends vscode.QuickPickItem {
    char: string;
    iconObj?: Icon;
}

const RECENT_ICONS_KEY = 'nerdy.recentIcons';
const RECENT_ICONS_LIMIT = 100;

function getIconUri(char: string, color: string): vscode.Uri {
    const svgSize = 24;
    const fontSize = 16;

    const fonts = [
        "'FiraCode Nerd Font'",
        "'FiraCode Nerd Font Mono'",
        "'JetBrainsMono Nerd Font'",
        "'JetBrainsMono Nerd Font Mono'",
        "'CaskaydiaCove Nerd Font'",
        "'CaskaydiaCove Nerd Font Mono'",
        "'MesloLGS NF'",
        "'Symbols Nerd Font'",
        "'Symbols Nerd Font Mono'",
        "'Hack Nerd Font'",
        "'Hack Nerd Font Mono'",
        "'DejaVuSansMono Nerd Font'",
        "'DejaVuSansMono Nerd Font Mono'",
        'monospace'
    ];
    const fontFamily = fonts.join(', ');

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

function updateRecentIcons(context: vscode.ExtensionContext, icon: Icon) {
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
    const iconData = getIconData();
    const recentIcons = context.globalState.get<Icon[]>(RECENT_ICONS_KEY, []);

    const items: (IconQuickPickItem | vscode.QuickPickItem)[] = [];

    if (recentIcons.length > 0) {
        items.push({
            label: 'Recently Used',
            kind: vscode.QuickPickItemKind.Separator
        });
        items.push(
            ...recentIcons.map((icon) => ({
                label: icon.name,
                description: icon.code,
                char: icon.char,
                iconObj: icon,
                iconPath: {
                    light: getIconUri(icon.char, '#333333'),
                    dark: getIconUri(icon.char, '#CCCCCC')
                }
            }))
        );
    }

    items.push({label: 'All Icons', kind: vscode.QuickPickItemKind.Separator});
    items.push(
        ...iconData.map((icon) => ({
            label: icon.name,
            description: icon.code,
            char: icon.char,
            iconObj: icon,
            iconPath: {
                light: getIconUri(icon.char, '#333333'),
                dark: getIconUri(icon.char, '#CCCCCC')
            }
        }))
    );

    vscode.window
        .showQuickPick(items as IconQuickPickItem[], {
            placeHolder: 'Select an icon to insert',
            matchOnDescription: true
        })
        .then((selection) => handleIconSelection(selection, context));
}

export function insertRecentIconCommand(context: vscode.ExtensionContext) {
    const recentIcons = context.globalState.get<Icon[]>(RECENT_ICONS_KEY, []);

    if (recentIcons.length === 0) {
        vscode.window.showInformationMessage('No recently used icons found.');
        return;
    }

    const iconItems: IconQuickPickItem[] = recentIcons.map((icon) => ({
        label: icon.name,
        description: icon.code,
        char: icon.char,
        iconObj: icon,
        iconPath: {
            light: getIconUri(icon.char, '#333333'),
            dark: getIconUri(icon.char, '#CCCCCC')
        }
    }));

    vscode.window
        .showQuickPick(iconItems, {
            placeHolder: 'Select a recently used icon',
            matchOnDescription: true
        })
        .then((selection) => handleIconSelection(selection, context));
}
