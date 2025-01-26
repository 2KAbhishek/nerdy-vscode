import * as vscode from 'vscode';
import { insertIconCommand } from './commands/insertIcon';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('nerdy.insertIcon', insertIconCommand);
    context.subscriptions.push(disposable);
}

export function deactivate() {}
