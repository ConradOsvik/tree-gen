# file-tree

`file-tree` is a command-line tool that generates a text tree view of a folder structure.

## Installation

To install `file-tree`, you need to have [Node.js](https://nodejs.org/) installed. Then, you can install it globally using npm, pnpm, or yarn:

```sh
npm install -g file-tree
```

```sh
pnpm add -g file-tree
```

```sh
yarn global add file-tree
```

You can also run it directly using `npx` or `pnpx` without installing it globally:

```sh
npx file-tree
```

```sh
pnpx file-tree
```

## Usage

```sh
file-tree [options]
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
file-tree
```

Generate a tree view for a specific directory and save it to a file:

```sh
file-tree --path /path/to/directory --output tree.txt
```

Ignore specific folders:

```sh
file-tree --ignore folders,to,ignore
```

## License

This project is licensed under the MIT License.
