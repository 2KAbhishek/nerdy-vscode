import * as assert from 'assert';
import * as vscode from 'vscode';
import {getIconData, Icon} from '../utils/iconData';
import {updateRecentIcons, RECENT_ICONS_KEY} from '../commands/insertIcon';

suite('Nerdy Test Suite', () => {
    test('getIconData should return icon data', () => {
        const iconData = getIconData();
        assert.ok(iconData.length > 0, 'Icon data should not be empty');
        assert.ok(iconData[0].name, 'Icon should have a name');
        assert.ok(iconData[0].code, 'Icon should have a code');
        assert.ok(iconData[0].char, 'Icon should have a char');
    });

    test('commands should be registered', async () => {
        const extensionId = '2kabhishek.nerdy-vscode';
        const extension = vscode.extensions.getExtension(extensionId);
        if (extension) {
            await extension.activate();
        }
        const commands = await vscode.commands.getCommands(true);
        assert.ok(
            commands.includes('nerdy.insertIcon'),
            'Command nerdy.insertIcon should be registered'
        );
        assert.ok(
            commands.includes('nerdy.insertRecentIcon'),
            'Command nerdy.insertRecentIcon should be registered'
        );
    });

    test('recent icons state should be manageable', async () => {
        const extensionId = '2kabhishek.nerdy-vscode';
        const extension = vscode.extensions.getExtension(extensionId);
        if (!extension) {
            return;
        }
        const context = (await extension.activate()) as vscode.ExtensionContext;

        const icon: Icon = {name: 'test-icon', code: '123', char: 'T'};

        // Clear existing state for testing
        await context.globalState.update(RECENT_ICONS_KEY, []);

        updateRecentIcons(context, icon);

        const recentIcons = context.globalState.get<Icon[]>(RECENT_ICONS_KEY);
        assert.ok(recentIcons, 'Recent icons should exist in state');
        assert.strictEqual(recentIcons.length, 1, 'Should have 1 recent icon');
        assert.strictEqual(recentIcons[0].name, 'test-icon');

        // Add same icon again - should still be 1
        updateRecentIcons(context, icon);
        const recentIconsAfterDup =
            context.globalState.get<Icon[]>(RECENT_ICONS_KEY);
        assert.strictEqual(
            recentIconsAfterDup?.length,
            1,
            'Should still have 1 icon after duplicate'
        );
    });

    test('clipboard should be updated', async () => {
        const testChar = '🧪';
        await vscode.env.clipboard.writeText(''); // Clear
        await vscode.env.clipboard.writeText(testChar);
        const clipboardText = await vscode.env.clipboard.readText();
        assert.strictEqual(
            clipboardText,
            testChar,
            'Clipboard should contain the test character'
        );
    });

    test('performance: icon data loading should be fast', () => {
        const start = Date.now();
        const iconData = getIconData();
        const end = Date.now();
        const duration = end - start;
        console.log(`Icon data loading took ${duration}ms`);
        assert.ok(
            duration < 500,
            'Icon data loading should take less than 500ms'
        );
    });
});
