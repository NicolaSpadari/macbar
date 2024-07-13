import { type ExtensionContext, commands, window } from "vscode";

export const activate = async (context: ExtensionContext) => {
	try {
		const packageJson = await import(`../package.json`);

		packageJson.contributes.commands.forEach((command) => {
			context.subscriptions.push(commands.registerCommand(command.command, () => {
				const terminal = window.createTerminal(command.title);
				terminal.show();
				terminal.sendText(packageJson.scripts[command.command]);
			}));
		});
	} catch (err) {
		window.showErrorMessage("Cannot find package.json", String(err));
	}
};

export const deactivate = () => {};
