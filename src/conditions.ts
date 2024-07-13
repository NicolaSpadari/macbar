import { Uri, commands, window, workspace } from "vscode";

interface ScriptToCheck {
	script: string
	contextKey: string
}

const setContextKeys = (scriptsToCheck: ScriptToCheck[], value: boolean) => {
	scriptsToCheck.forEach(({ contextKey }) => {
		commands.executeCommand("setContext", contextKey, value);
	});
};

export const checkPackageJsonCondition = async (scriptsToCheck: ScriptToCheck[]) => {
	const workspaceFolders = workspace.workspaceFolders;

	if (workspaceFolders) {
		const packageJsonUri = Uri.joinPath(workspaceFolders[0].uri, "package.json");

		try {
			const packageJsonContent = await workspace.fs.readFile(packageJsonUri);
			const packageJson = JSON.parse(packageJsonContent.toString());

			scriptsToCheck.forEach(({ script, contextKey }) => {
				const scriptExists = packageJson.scripts && packageJson.scripts[script];
				commands.executeCommand("setContext", contextKey, scriptExists);
			});
		} catch (error) {
			console.error("Error reading package.json:", error);
			window.showErrorMessage("Error reading package.json:", String(error));

			setContextKeys(scriptsToCheck, false);
		}
	} else {
		setContextKeys(scriptsToCheck, false);
	}
};
