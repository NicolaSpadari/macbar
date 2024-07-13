import { Uri, workspace } from "vscode";

export const getScriptsToCheck = async () => {
	const workspaceFolders = workspace.workspaceFolders;

	if (workspaceFolders) {
		const packageJsonUri = Uri.joinPath(workspaceFolders[0].uri, "package.json");

		try {
			const packageJsonContent = await workspace.fs.readFile(packageJsonUri);
			const packageJson = JSON.parse(packageJsonContent.toString());

			return Object.keys(packageJson.scripts).map((script) => ({
				script,
				contextKey: `macbar.${script}Exists`
			}));
		} catch (err) {
			console.log(err);
			return [];
		}
	}
};
