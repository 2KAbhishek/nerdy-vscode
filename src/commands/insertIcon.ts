import * as vscode from 'vscode';
import { getIconData } from '../utils/iconData';

export function insertIconCommand() {
    const iconData = getIconData();
    const iconItems = iconData.map(icon => ({
        label: icon.name,
        description: icon.code,
        detail: icon.char,
        icon: icon.char
    }));

    vscode.window.showQuickPick(iconItems, {
        placeHolder: 'Select an icon to insert',
        }).then(selection => {
            if (selection) {
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    editor.edit(editBuilder => {
                        editBuilder.insert(editor.selection.active, selection.detail);
                    });
                }
            }
    });
}
