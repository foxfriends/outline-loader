[Outline]: https://github.com/oinkiguana/outline

# Outline Loader

A Webpack loader that works with [Outline][] to compile literate JavaScript.

Note that to use this loader requires that you have installed Outline, and it is available on your
path. See the [Outline][] documentation for installation instructions.

## Installation

```bash
npm install --save-dev outline-loader
```

## Options

*   `language`: Passed to Outline's `-l` parameter, indicating the language tag to compile with
*   `style`: Passed to Outline's `-s` parameter to override the automatically detected style
*   `config`: Passed to Outline's `-c` parameter to specify the path to the `Outline.toml` file
*   `entrypoint`: Passed to Outline's `-e` parameter to choose a named entrypoint

## Example usage:

`index.js`

```js
import { myFunction } from './functions.js.tex';

myFunction(3); // => 5
```

`functions.js.tex`

```tex
\documentclass[11pt,a4paper]{article}

\begin{document}

This module works like this:

\begin{code}
==> Define some functions.
==> Export the functions.
\end{code}

Our function \texttt{myFunction} is used to add two to any input.

\begin{code}[name=Define some functions]
function myFunction(input) {
  return input + 2;
}
\end{code}

Now that all the functions are written, they must be exported.

\begin{code}[name=Export the functions]
export { myFunction };
\end{code}

\end{document}
```

`webpack.config.js`

```js
module.exports = {
  entry: 'index.js',
  module: {
    rules: [
      { test: /\.js\.(tex|md|html|bird)$/, loader: 'outline-loader' },
    ],
  },
};
```
