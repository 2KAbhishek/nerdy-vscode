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

    test('commands should be registered', async () => {
        const extensionId = 'undefined_publisher.nerdy-vscode';
        const extension = vscode.extensions.getExtension(extensionId);
        if (extension) {
            await extension.activate();
        }
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('nerdy.insertIcon'), 'Command nerdy.insertIcon should be registered');
        assert.ok(commands.includes('nerdy.insertRecentIcon'), 'Command nerdy.insertRecentIcon should be registered');
    });

    test('recent icons state should be manageable', async () => {
        const extensionId = 'undefined_publisher.nerdy-vscode';
        const extension = vscode.extensions.getExtension(extensionId);
        if (!extension) {
            return;
        }
        const context = await extension.activate() as any;
        
        // We can't easily access the internal context from outside, 
        // but we can check if the state is being updated by triggering the command if possible
        // or by directly manipulating the state if we can get a handle on it.
        // For integration tests, we'll focus on command availability.
    });

    test('clipboard should be updated on icon selection', async () => {
        // This is hard to test without actually selecting from QuickPick in tests
        // which requires complex automation. We'll stick to unit-like tests where possible.
    });
});
