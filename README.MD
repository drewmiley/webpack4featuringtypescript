# Webpack4 featuring Typescript

A simple React, Redux, Typescript, Webpack4 thing using Async/Await.

## How to replicate

1. `git init`
1. `touch .gitignore`
1. Add `node_modules/` and `package-lock.json` to the `.gitignore` file.
1. `npm init`
1. Answer the questions however you wish.
1. COMMIT
1. `mkdir src`
1. `touch src/index.html src/index.jsx`
1. `touch webpack.config.js`
1. Open `src/index.html` and add
```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cool App</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    </html>
```
1. Open `src/index.js` and add
```
    import React from 'react';
    import ReactDOM from 'react-dom';

    ReactDOM.render(
        <h1>Hello World</h1>,
        document.getElementById('app')
    );
```
1. `npm install babel-loader@7 babel-core babel-preset-env babel-preset-es2015 babel-preset-react`
1. `npm install webpack webpack-dev-server webpack-cli html-webpack-plugin`
1. `npm install react react-dom`
1. Open `webpack.config.js` and add
```
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  target: "web",
  mode: "development",
  entry: {
    app: './src/index.jsx'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
           presets: ['env', 'es2015', 'react']
          }
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
```
1. In `package.json`, in scripts objects, set
```
"start": "webpack-dev-server --config webpack.config.js"
```
1. `npm start`
1. Open your browser at `localhost:8080` and gasp in awe.
1. COMMIT
