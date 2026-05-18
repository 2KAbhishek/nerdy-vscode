import * as vscode from 'vscode';
import {
    insertIconCommand,
    insertRecentIconCommand,
    preloadIconData
} from './commands/insertIcon';

export function activate(context: vscode.ExtensionContext) {
    // Eagerly preload icon data in the background
    preloadIconData();

    context.subscriptions.push(
        vscode.commands.registerCommand('nerdy.insertIcon', () =>
            insertIconCommand(context)
        ),
        vscode.commands.registerCommand('nerdy.insertRecentIcon', () =>
            insertRecentIconCommand(context)
        )
    );
    return context;
}

export function deactivate() {}
