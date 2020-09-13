const path = require("path");
const nodeExternals = require("webpack-node-externals");

const config = type => env => ({
  mode: env.NODE_ENV,
  entry: type === "frontend" ? "./src/App.tsx" : "./src/index.ts",
  output: type === "frontend" ? {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  } : 
  {
    path: path.resolve(__dirname, "./"),
    filename: "index.js"
  },
  target: type === "frontend" ? "web" : "node",
  externals: type === "frontend" ? [] : [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            //transpileOnly: true
          }
        },
        include: /src/
      },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react"
            ],
            plugins: [
              "babel-plugin-styled-components"
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets"
            }
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
    symlinks: false
  }
});

module.exports = [config("frontend"), config("backend")];