/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config()
import path from "path"
import nodeExternals from "webpack-node-externals"

module.exports = {
	mode: process.env.NODE_ENV,
	target: "node",
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: path.resolve(__dirname, "src"),
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			}
		]
	},
	resolve: {
		fallback: {
			path: false
		},
		extensions: [".ts"],
		preferAbsolute: true,
		alias: {
			"@types": path.join(__dirname, "src/@types/"),
			core: path.join(__dirname, "src/core/"),
			middlewares: path.join(__dirname, "src/middlewares/"),
			models: path.join(__dirname, "src/models/"),
			routes: path.join(__dirname, "src/routes/"),
			utilities: path.join(__dirname, "src/utilities/")
		}
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.bundle.js"
	},
	externals: [nodeExternals()],
	optimization: {
		minimize: process.env.NODE_ENV === "production" ? true : false
	}
}
