import * as vscode from 'vscode';
import { getIconData, Icon } from '../utils/iconData';

interface IconQuickPickItem extends vscode.QuickPickItem {
    char: string;
}

export function insertIconCommand() {
    const iconData = getIconData();
    const iconItems: IconQuickPickItem[] = iconData.map(icon => ({
        label: `${icon.char} ${icon.name}`,
        description: icon.code,
        char: icon.char,
    }));

    vscode.window.showQuickPick(iconItems, {
        placeHolder: 'Select an icon to insert',
        matchOnDescription: true,
    }).then(selection => {
        if (selection) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, selection.char);
                });
            } else {
                vscode.window.showErrorMessage('No active editor found to insert the icon.');
            }
        }
    });
}
