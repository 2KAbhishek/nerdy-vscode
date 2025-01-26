import * as assert from 'assert';
import * as vscode from 'vscode';
import { getIconData } from '../utils/iconData';

suite('Nerdy Test Suite', () => {
    test('getIconData should return icon data', () => {
        const iconData = getIconData();
        assert.ok(iconData.length > 0, 'Icon data should not be empty');
    });

    test('insertIconCommand should insert selected icon', async () => {
        const iconData = getIconData();
        const icon = iconData[0];

        await vscode.commands.executeCommand('nerdy.insertIcon');

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const documentText = editor.document.getText();
            assert.ok(documentText.includes(icon.char), 'Document should contain the inserted icon');
        }
    });
});
