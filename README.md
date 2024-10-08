# treeplan

`treeplan` is a command-line tool that generates a text tree view of a folder structure.

## Installation

To install `treeplan`, you need to have [Node.js](https://nodejs.org/) installed. Then, you can install it globally using npm, pnpm, or yarn:

```sh
npm install -g treeplan
```

```sh
pnpm add -g treeplan
```

```sh
yarn global add treeplan
```

You can also run it directly using `npx` or `pnpx` without installing it globally:

```sh
npx treeplan
```

```sh
pnpx treeplan
```

## Usage

```sh
treeplan [options]
```

### Options

-   `-V, --version`: Output the version number
-   `-p, --path <path>`: The directory path to generate a tree view for (default: `.`)
-   `-o, --output <file>`: Output file to save the tree view
-   `-i, --ignore <folders>`: Comma-separated list of folders to ignore (e.g., `node_modules`, `dist`) (default: `node_modules`, `.git`)
-   `-n, --no-default-ignore`: Do not ignore default folders (`node_modules`, `.git`)
-   `-h, --help`: Display help for command

### Example

Generate a tree view for the current directory and print it to the console:

```sh
treeplan
```

Generate a tree view for a specific directory and save it to a file:

```sh
treeplan --path /path/to/directory --output tree.txt
```

Ignore specific files and folders:

```sh
treeplan --ignore files,and,folders,to,ignore
```

Do not use default ignore patterns:

```sh
treeplan --no-default-ignore
```

## License

This project is licensed under the MIT License.
