# tree-map

`tree-map` is a command-line tool that generates a text tree view of a folder structure.

## Installation

To install `tree-map`, you need to have [Node.js](https://nodejs.org/) installed. Then, you can install it globally using npm, pnpm, or yarn:

```sh
npm install -g tree-map
```

```sh
pnpm add -g tree-map
```

```sh
yarn global add tree-map
```

You can also run it directly using `npx` or `pnpx` without installing it globally:

```sh
npx tree-map
```

```sh
pnpx tree-map
```

## Usage

```sh
tree-map [options]
```

### Options

-   `-V, --version`: Output the version number
-   `-p, --path <path>`: The directory path to generate a tree view for (default: `.`)
-   `-o, --output <file>`: Output file to save the tree view
-   `-i, --ignore <folders>`: Comma-separated list of folders to ignore (e.g., `node_modules,dist`) (default: `["node_modules","dist","build",".git"]`)
-   `-h, --help`: Display help for command

### Example

Generate a tree view for the current directory and print it to the console:

```sh
tree-map
```

Generate a tree view for a specific directory and save it to a file:

```sh
tree-map --path /path/to/directory --output tree.txt
```

Ignore specific files and folders:

```sh
tree-map --ignore files,and,folders,to,ignore
```

## License

This project is licensed under the MIT License.
