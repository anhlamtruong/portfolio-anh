// webpack.config.js
const path = require("path");
const glob = require("glob");

// This function now correctly finds and formats the entry file paths.
const entries = glob
  .sync("src/app/creata/_repositories/**/*-component.tsx")
  .reduce((acc, item) => {
    const name = path.basename(path.dirname(item));
    // We explicitly add './' to ensure Webpack treats it as a relative path.
    acc[name] = "./" + item;
    return acc;
  }, {});

module.exports = {
  mode: "production",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist/components"),
    filename: "[name].bundle.js",
    library: {
      name: "CreataComponent",
      type: "umd",
    },
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // This alias helps resolve imports starting with '@/' inside your components.
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
