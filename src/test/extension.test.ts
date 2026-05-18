import * as assert from 'assert';
import * as vscode from 'vscode';
import { getIconData } from '../utils/iconData';

suite('Nerdy Test Suite', () => {
    test('getIconData should return icon data', () => {
        const iconData = getIconData();
        assert.ok(iconData.length > 0, 'Icon data should not be empty');
        assert.ok(iconData[0].name, 'Icon should have a name');
        assert.ok(iconData[0].code, 'Icon should have a code');
        assert.ok(iconData[0].char, 'Icon should have a char');
    });

    test('insertIconCommand should be registered', async () => {
        const extensionId = 'undefined_publisher.nerdy-vscode';
        const extension = vscode.extensions.getExtension(extensionId);
        if (extension) {
            await extension.activate();
        } else {
            console.log('Available extensions:', vscode.extensions.all.map(e => e.id));
        }
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('nerdy.insertIcon'), 'Command nerdy.insertIcon should be registered');
    });
});
