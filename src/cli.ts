#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import { fileURLToPath } from 'url'

// Resolve __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read and parse package.json to get the name and version
const packageJsonPath = path.resolve(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
const name = packageJson.name
const version = packageJson.version

const program = new Command()

program
	.name(name)
	.description('Generate a text tree view of a folder structure')
	.version(version) // Use the version from package.json
	.option(
		'-p, --path <path>',
		'The directory path to generate a tree view for',
		'.'
	)
	.option('-o, --output <file>', 'Output file to save the tree view')
	.option(
		'-i, --ignore <folders>',
		'Comma-separated list of folders to ignore (e.g., node_modules,dist)',
		(value) => value.split(','),
		['node_modules', 'dist', 'build', '.git'] // Default ignore list
	)
	.parse(process.argv)

const options = program.opts()
const directory = path.resolve(options.path)
const outputFile = options.output
const ignoreList = new Set<string>(options.ignore)

/**
 * Generates a text tree view of a folder structure.
 *
 * @param {string} dir - The directory path to generate a tree view for.
 * @param {string} [indent=''] - The indentation string for the current level.
 * @returns {string} - The generated tree view as a string.
 */
function generateTreeView(dir: string, indent = ''): string {
	let result = ''
	const files = fs.readdirSync(dir)

	// Separate dotdirectories, directories, dotfiles, and regular files
	const dotdirectories = files.filter(
		(file) =>
			file.startsWith('.') &&
			fs.statSync(path.join(dir, file)).isDirectory()
	)
	const directories = files.filter(
		(file) =>
			!file.startsWith('.') &&
			fs.statSync(path.join(dir, file)).isDirectory()
	)
	const dotfiles = files.filter(
		(file) =>
			file.startsWith('.') &&
			!fs.statSync(path.join(dir, file)).isDirectory()
	)
	const regularFiles = files.filter(
		(file) =>
			!file.startsWith('.') &&
			!fs.statSync(path.join(dir, file)).isDirectory()
	)

	// Sort each category alphabetically
	dotdirectories.sort()
	dotfiles.sort()
	directories.sort()
	regularFiles.sort()

	// Concatenate the sorted categories
	const sortedFiles = dotdirectories.concat(
		directories,
		dotfiles,
		regularFiles
	)

	sortedFiles.forEach((file, index) => {
		// Skip files and directories in the ignore list
		if (ignoreList.has(file)) {
			return
		}

		const filePath = path.join(dir, file)
		const isDirectory = fs.statSync(filePath).isDirectory()
		const isLast = index === sortedFiles.length - 1
		const prefix = isLast ? '└── ' : '├── '

		result += indent + prefix + file + '\n'

		if (isDirectory) {
			result += generateTreeView(
				filePath,
				indent + (isLast ? '    ' : '│   ')
			)
		}
	})

	return result
}

const tree = generateTreeView(directory)

if (outputFile) {
	fs.writeFileSync(outputFile, tree)
	console.log(`Tree view saved to ${outputFile}`)
} else {
	console.log(tree)
}
