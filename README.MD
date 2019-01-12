# Webpack4 featuring Typescript

A simple React, Redux, Typescript, Webpack4 thing using Async/Await.

## How to replicate

1. `git init`
2. `touch .gitignore`
3. Add `node_modules/` and `package-lock.json` to the `.gitignore` file.
4. `npm init`
5. Answer the questions however you wish.
6. COMMIT
7. `mkdir src`
8. `touch src/index.html src/index.jsx`
9. `touch webpack.config.js`
10. `npm install babel-loader@7 babel-core babel-preset-env babel-preset-es2015 babel-preset-react`
11. `npm install webpack webpack-dev-server webpack-cli html-webpack-plugin`
12. `npm install react react-dom`
13. Open `src/index.html` and add
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
14. Open `src/index.js` and add
```
  import React from 'react';
  import ReactDOM from 'react-dom';

  ReactDOM.render(
      <h1>Hello World</h1>,
      document.getElementById('app')
  );
```
15. Open `webpack.config.js` and add
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
16. In `package.json`, in scripts objects, set
```
"start": "webpack-dev-server --config webpack.config.js"
```
17. `npm start`
18. Open your browser at `localhost:8080` and gasp in awe.
19. COMMIT
20. `touch src/AppContainer.jsx`
21. `mkdir src/components`
22. `touch src/components/FetchRandomUsers.jsx`
23. In `src/index.jsx`, add the line `import AppContainer from './AppContainer';` and change `<h1>Hello World</h1>` to `<AppContainer />`
24. In `src/AppContainer.jsx` add
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
25. In `src/components/FetchRandomUsers.jsx` add
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
26. `npm install babel-polyfill`
27. In `webpack.config.js` change `app: './src/index.jsx'` to `app: ['babel-polyfill', './src/index.jsx']`
28. Open your browser at `localhost:8080` and gasp in awe.
29. COMMIT
30. `mkdir src/ducks`
31. `touch src/ducks/actions.js`
32. `touch src/ducks/actiontypes.js`
33. `touch src/ducks/reducer.js`
34. `touch src/ducks/store.js`
35. `touch src/components/ClickMe.jsx`
36. `touch src/components/NumeralDisplay.jsx`
37. `npm install react-redux redux`
38. In `src/ducks/actions.js` add
```
import * as actiontypes from './actiontypes';

export function setNumber(number) {
    return {
        type: actiontypes.SET_NUMBER,
        number
    }
}
```
39. In `src/ducks/actiontypes.js` add
```
export const SET_NUMBER = 'SET_NUMBER';
```
40. In `src/ducks/reducer.js` add
```
import * as actiontypes from './actiontypes';

const setNumber = (state, number) => {
    return Object.assign({}, { number });
}

export default function(state = {}, action) {
    switch (action.type) {
        case actiontypes.SET_NUMBER:
            return setNumber(state, action.number);
        default:
            return state;
    }
}
```
41. In `src/ducks/store.js` add
```
import { compose, createStore } from 'redux';

import reducer from './reducer';

export default createStore(reducer, { number: 0 });
```
42. In `src/components/ClickMe.jsx` add
```
import React, { Component } from 'react';

export default class ClickMe extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = (nextProps, nextState) => {
            return false;
        };
    }

    clickMe() {
        this.props.setNumber(Math.floor(100 * Math.random()));
    }

    render() {
        return (
            <button type='button' onClick={(e) => this.clickMe()}>Click Me</button>
        );
    }
};
```
43. In `src/components/NumeralDisplay.jsx` add
```
import React, { Component } from 'react';

export default class NumeralDisplay extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = (nextProps, nextState) => {
            return this.props.number !== nextProps.number;
        };
    }

    render() {
        return (
            <span>{this.props.number}</span>
        );
    }
};
```
44. In `src/AppContainer.jsx` add the imports
```
import {connect} from 'react-redux';

import * as actions from './ducks/actions';

import ClickMe from './components/ClickMe';
import NumeralDisplay from './components/NumeralDisplay';
```
45. In `src/AppContainer.jsx` add between the div tags
```
<ClickMe
    setNumber={this.props.setNumber}
/>
<NumeralDisplay
    number={this.props.number}
/>
```
46. In `src/AppContainer.jsx` change the last line export to
```
export default connect(state => state, actions)(App);
```
47. In `src/index.jsx` add the imports
```
import {Provider} from 'react-redux';
import store from './ducks/store';
```
48. In `src/index.jsx` change the line `<AppContainer />` to
```
<Provider store={store}>
    <AppContainer />
</Provider>
```
49. Open your browser at `localhost:8080` and gasp in awe.
50. COMMIT
51. Change `actiontypes.js` to `actiontypes.ts` and change the code inside to
```
export const SET_NUMBER: string = 'SET_NUMBER';
```
52. Add `'.ts'` to the extensions array in `webpack.config.js`
53. `npm install typescript awesome-typescript-loader`
54. In `webpack.config.js`, in the rules array, add
```
{
  test: /\.ts$/,
  exclude: /node_modules/,
  use: {
    loader: "awesome-typescript-loader"
  }
}
```
55. `touch tsconfig.json`
56. In `tsconfig.json` add
```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es6",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```
57. Open your browser at `localhost:8080` and gasp in awe.
58. COMMIT
59. Congratulations on reaching the end of this tutorial!
