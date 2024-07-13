import { type ExtensionContext, commands, window } from "vscode";
import { scripts } from "../package.json";

export function activate(context: ExtensionContext) {
	window.showInformationMessage(JSON.stringify(scripts));

	context.subscriptions.push(commands.registerCommand("macbar.dev", () => {
		const terminal = window.createTerminal(`Dev`);
		terminal.show();
		terminal.sendText("nr dev");
	}));
}

export function deactivate() {}
