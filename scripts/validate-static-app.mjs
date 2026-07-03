import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const rootDir = process.cwd()
const requiredFiles = ['index.html']
const jsExtensions = new Set(['.js', '.mjs', '.cjs'])
const localRefPattern = /^(?![a-z]+:|\/\/|#|data:|mailto:|tel:|javascript:)(.+)$/i

const missingFiles = []
const syntaxErrors = []

main()

function main() {
  validateRequiredFiles()
  validateJavaScriptSyntax()
  validateAssetReferences()

  if (missingFiles.length || syntaxErrors.length) {
    if (syntaxErrors.length) {
      console.error('JavaScript syntax validation failed:')
      for (const issue of syntaxErrors) console.error(`- ${issue}`)
    }

    if (missingFiles.length) {
      console.error('Missing local asset references detected:')
      for (const issue of missingFiles) console.error(`- ${issue}`)
    }

    process.exit(1)
  }

  console.log('Static validation passed.')
}

function validateRequiredFiles() {
  for (const relativePath of requiredFiles) {
    const absolutePath = path.join(rootDir, relativePath)
    if (!existsSync(absolutePath)) {
      missingFiles.push(`${relativePath} (required file is missing)`)
    }
  }
}

function validateJavaScriptSyntax() {
  const jsFiles = walkFiles(rootDir).filter(filePath => jsExtensions.has(path.extname(filePath)))

  for (const filePath of jsFiles) {
    const result = spawnSync(process.execPath, ['--check', filePath], {
      cwd: rootDir,
      encoding: 'utf8'
    })

    if (result.status === 0) continue

    const relPath = toRepoPath(filePath)
    const errorText = [result.stderr, result.stdout].filter(Boolean).join('\n').trim()
    syntaxErrors.push(`${relPath}${errorText ? `\n  ${indent(errorText)}` : ''}`)
  }
}

function validateAssetReferences() {
  const filesToScan = walkFiles(rootDir).filter(filePath => {
    const ext = path.extname(filePath)
    return ext === '.html' || ext === '.css' || jsExtensions.has(ext)
  })

  const seenRefs = new Set()

  for (const filePath of filesToScan) {
    const source = readFileSync(filePath, 'utf8')
    const references = [
      ...extractHtmlRefs(filePath, source),
      ...extractCssRefs(filePath, source),
      ...extractJsRefs(filePath, source)
    ]

    for (const ref of references) {
      if (!isLocalReference(ref.reference)) continue

      const normalizedRef = normalizeReference(ref.reference)
      if (!normalizedRef) continue

      const resolvedPath = resolveReference(filePath, normalizedRef)
      const key = `${toRepoPath(filePath)}::${normalizedRef}`

      if (seenRefs.has(key)) continue
      seenRefs.add(key)

      if (!existsSync(resolvedPath)) {
        missingFiles.push(`${toRepoPath(filePath)} -> ${normalizedRef}`)
      }
    }
  }
}

function extractHtmlRefs(filePath, source) {
  if (path.extname(filePath) !== '.html') return []

  const refs = []
  const attrPattern = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi

  for (const match of source.matchAll(attrPattern)) {
    refs.push({ type: 'html', reference: match[1] })
  }

  return refs
}

function extractCssRefs(filePath, source) {
  if (path.extname(filePath) !== '.css') return []

  const refs = []
  const urlPattern = /url\(\s*['"]?([^"')]+)['"]?\s*\)/gi
  const importPattern = /@import\s+(?:url\(\s*)?['"]([^"']+)['"]/gi

  for (const match of source.matchAll(urlPattern)) {
    refs.push({ type: 'css-url', reference: match[1] })
  }

  for (const match of source.matchAll(importPattern)) {
    refs.push({ type: 'css-import', reference: match[1] })
  }

  return refs
}

function extractJsRefs(filePath, source) {
  if (!jsExtensions.has(path.extname(filePath))) return []

  const refs = []
  const stringPattern = /(['"`])((?:\\\1|.)*?)\1/g
  const assetPathPattern = /^(?:\.{1,2}\/)?(?:assets|fonts|css|js)\/.+|^(?:assets|fonts|css|js)\/.+/i
  const fileNamePattern = /^[\w.-]+\.(?:png|jpe?g|gif|svg|webp|ico|css|js|ttf|woff2?)$/i

  for (const match of source.matchAll(stringPattern)) {
    const candidate = match[2].trim()
    if (!assetPathPattern.test(candidate) && !fileNamePattern.test(candidate)) continue
    refs.push({ type: 'js-string', reference: candidate })
  }

  return refs
}

function isLocalReference(reference) {
  return localRefPattern.test(reference.trim())
}

function normalizeReference(reference) {
  const trimmed = reference.trim()
  if (!trimmed) return null

  return trimmed.split('?')[0].split('#')[0]
}

function resolveReference(fromFilePath, reference) {
  if (reference.startsWith('/')) {
    return path.join(rootDir, reference.slice(1))
  }

  if (/^(?:assets|fonts|css|js)\//i.test(reference)) {
    return path.join(rootDir, reference)
  }

  return path.resolve(path.dirname(fromFilePath), reference)
}

function walkFiles(startDir) {
  const entries = readdirSync(startDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue

    const absolutePath = path.join(startDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkFiles(absolutePath))
      continue
    }

    if (entry.isFile() || statSync(absolutePath).isFile()) {
      files.push(absolutePath)
    }
  }

  return files
}

function toRepoPath(filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join('/')
}

function indent(text) {
  return text.replace(/\r?\n/g, '\n  ')
}
