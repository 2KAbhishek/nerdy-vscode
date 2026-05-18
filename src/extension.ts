import * as vscode from 'vscode';
import { insertIconCommand, insertRecentIconCommand } from './commands/insertIcon';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('nerdy.insertIcon', () => insertIconCommand(context)),
        vscode.commands.registerCommand('nerdy.insertRecentIcon', () => insertRecentIconCommand(context))
    );
}

export function deactivate() {}
