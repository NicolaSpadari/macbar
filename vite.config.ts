import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			"@@": resolve(__dirname, "/"),
			"@": resolve(__dirname, "./src")
		}
	}
});
