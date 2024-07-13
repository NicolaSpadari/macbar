import { type ExtensionContext, commands, window, workspace } from "vscode";
import { contributes } from "@@/package.json";
import { checkPackageJsonCondition } from "./conditions";
import { getScriptsToCheck } from "./scripts";

const macbarCommands = contributes.commands;

export const activate = async (context: ExtensionContext) => {
	let terminal;

	if (window.terminals.length) {
		terminal = window.terminals[0];
	}
	if (!terminal) {
		terminal = window.createTerminal("MacBar");
	}

	const scriptsToCheck = await getScriptsToCheck() || [];

	macbarCommands.forEach((macbarCommand) => {
		context.subscriptions.push(commands.registerCommand(macbarCommand.command, () => {
			terminal.show();
			terminal.sendText(macbarCommand.shortTitle);
		}));
	});

	checkPackageJsonCondition(scriptsToCheck);

	workspace.onDidSaveTextDocument((document) => {
		if (document.uri.path.endsWith("package.json")) {
			checkPackageJsonCondition(scriptsToCheck);
		}
	});
};

export const deactivate = () => {};
