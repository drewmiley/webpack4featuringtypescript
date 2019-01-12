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
1. `touch src/AppContainer.jsx`
1. `mkdir src/components`
1. `touch src/components/FetchRandomUsers.jsx`
1. In `src/index.jsx`, add the line `import AppContainer from './AppContainer';` and change `<h1>Hello World</h1>` to `<AppContainer />`
1. In `src/AppContainer.jsx` add
```
import React, { Component } from 'react';

import FetchRandomUsers from './components/FetchRandomUsers';

class App extends Component {
    render() {
        return <div>
            <FetchRandomUsers />
        </div>
    }
};

export default App;
```
1. In `src/components/FetchRandomUsers.jsx` add
```
import React, { Component } from 'react';

export default class FetchRandomUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    async componentDidMount() {
        const response = await fetch('https://randomuser.me/api/?results=2');
        const json = await response.json();
        this.setState({ users: json.results });
    }

    render() {
        return (
            <ul>
                {this.state.users.map((user, i) => (
                    <li key={i}>{user.name.title} {user.name.first} {user.name.last}</li>
                ))}
            </ul>
        );
    }
}
```
1. `npm install babel-polyfill`
1. In `webpack.config.js` change `app: './src/index.jsx'` to `app: ['babel-polyfill', './src/index.jsx']`
1. Open your browser at `localhost:8080` and gasp in awe.
1. COMMIT
