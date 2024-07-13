<h1 align="center">MacBar</h1>

<p align="center">
	<img src="res/icon.png" width="150" />
</p>
<p align="center">Put your npm scripts in the Macbook touchbar</p>

## About

VSCode has support for the Macbook touchbar, but doens't actually do anything useful with it.
<br />
With this extension, it will add available scripts from the `package.json` to it when you open a projects that has a package file.
<br />
The only catch is that commands have to be predefined in the manifest of the extension, so it cannot be as dynamic as I wish. The solution is list a possible set of scripts and if your package has them, conditionally show the button that runs the script.
<br />
Package manager is handled by [@antfu/ni](https://github.com/antfu/ni)

## Build your own:

Clone to local:
```sh
$ npx degit NicolaSpadari/macbar my-macbar
```

Install dependencies:
```sh
$ pnpm install
```

Edit the list of scripts:
```json
// package.json

// ...
"contributes": {
	"commands": [
		{
			"command": "macbar.lint",
			"title": "Lint",
			"shortTitle": "nr lint"
		},
		{
			"command": "macbar.dev",
			"title": "Dev",
			"shortTitle": "nr dev"
		},
		// ...
	],
	"menus": {
		"touchBar": [
			{
				"command": "macbar.lint",
				"group": "scripts",
				"when": "macbar.lintExists"
			},
			{
				"command": "macbar.dev",
				"group": "scripts",
				"when": "macbar.devExists"
			},
			// ...
		]
	}
},
// ...
```

Notes:
- `shortTitle` here is used as a field for the command itself
- `macbar.<task>` **must** match the script name (eg: "dev")

Build the extension:
```sh
$ pnpm run generate
```

Install the generated `.vsix` file that will appear in the root of your project
