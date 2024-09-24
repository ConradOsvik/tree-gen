#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import { fileURLToPath } from 'url'

// Resolve __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read and parse package.json to get the name, description and version
const packageJsonPath = path.resolve(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
const name = packageJson.name
const description = packageJson.description
const version = packageJson.version

const program = new Command()

// Default ignore list
const defaultIgnorePatterns = ['node_modules', '.git']

program
	.name(name)
	.description(description)
	.version(version)
	.option(
		'-p, --path <path>',
		'The directory path to generate a tree view for',
		'.'
	)
	.option('-o, --output <file>', 'Output file to save the tree view')
	.option(
		'-i, --ignore <folders>',
		`Comma-separated list of folders to ignore (default: ${defaultIgnorePatterns.join(
			', '
		)})`,
		(value) => value.split(',').map((pattern) => pattern.trim())
	)
	.option(
		'-n, --no-default-ignore',
		`Do not ignore default folders (${defaultIgnorePatterns.join(', ')})`
	)
	.parse(process.argv)

const options = program.opts()
const directory = path.resolve(options.path)
const outputFile = options.output

//Ensure options.ignore is always an array
const userIgnorePatterns = options.ignore || []

// Combine the default ignore list with the user-provided ignore list
const ignorePatterns = !options.defaultIgnore
	? userIgnorePatterns
	: [...defaultIgnorePatterns, ...userIgnorePatterns]

const ignoreList = new Set<string>(ignorePatterns)

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
	const dotDirectories = files.filter(
		(file) =>
			file.startsWith('.') &&
			fs.lstatSync(path.join(dir, file)).isDirectory()
	)
	const directories = files.filter(
		(file) =>
			!file.startsWith('.') &&
			fs.lstatSync(path.join(dir, file)).isDirectory()
	)
	const dotFiles = files.filter(
		(file) =>
			file.startsWith('.') &&
			!fs.lstatSync(path.join(dir, file)).isDirectory()
	)
	const regularFiles = files.filter(
		(file) =>
			!file.startsWith('.') &&
			!fs.lstatSync(path.join(dir, file)).isDirectory()
	)

	// Sort each category alphabetically
	dotDirectories.sort()
	dotFiles.sort()
	directories.sort()
	regularFiles.sort()

	// Concatenate the sorted categories
	const sortedFiles = dotDirectories.concat(
		directories,
		dotFiles,
		regularFiles
	)

	sortedFiles.forEach((file, index) => {
		// Skip files and directories in the ignore list
		if (ignoreList.has(file)) {
			return
		}

		const filePath = path.join(dir, file)
		const isDirectory = fs.lstatSync(filePath).isDirectory()
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
