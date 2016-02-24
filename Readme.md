# Simple MJML development server

`mjml-serve` is a _very_ simple command line tool for hosting .mjml files while
developing. It allows you to view the email in your browser as html while developing.

## Installation

```
npm install -g mjml-serve
```

# Usage

`mjml-serve` by default will look for .mjml files in the `cwd` it is run from.
To begin hosting files create an mjml file in your current directory.

```
echo "<mj-body><mj-section><mj-column><mj-text>Hello World</mj-text></mj-column></mj-section></mj-body>" > example.mjml
```

Then run the server

```
mjml-serve
```

And open your browser to http://localhost:5432/example.mjml
