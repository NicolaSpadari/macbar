import eslintConfig from "@antfu/eslint-config";

export default eslintConfig({
	typescript: true,
	stylistic: {
		indent: "tab",
		quotes: "double"
	},
	rules: {
		curly: "off",
		"no-console": "off",
		"no-new-func": "off",
		"style/semi": ["error", "always"],
		"style/indent": ["error", "tab"],
		"style/quote-props": ["warn", "as-needed"],
		"style/comma-dangle": ["warn", "never"],
		"style/brace-style": ["warn", "1tbs"],
		"style/arrow-parens": ["error", "always"],
		"antfu/top-level-function": "off",
		"node/prefer-global/process": ["off"]
	}
});
