import * as fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import pkg from '../package.json'
import childProcess from 'node:child_process'

interface BuildOptions {
  nextConfigPath: string
}

const setNextOptions = async (nextConfig: string) => {
  const currentConfig = await import(nextConfig).then((r) => r.default)
  const updatedConfig = {
    ...currentConfig,
    output: 'standalone',
    serverRuntimeConfig: {
      ...currentConfig.serverRuntimeConfig,
      // nextServerlessCacheConfig: cacheConfig
    },
    // cacheHandler: require.resolve(path.join('..', 'cacheHandler', 'index.js'))
  }

  console.log('nextConfig', nextConfig)
  const currentContent = fs.readFileSync(nextConfig, 'utf-8')

  let updatedContent = `module.exports = ${JSON.stringify(updatedConfig, null, 4)};\n`

  // Check if the file has .mjs extension
  if (nextConfig.endsWith('.mjs')) {
    updatedContent = `export default ${JSON.stringify(updatedConfig, null, 4)};\n`
  }

  fs.writeFileSync(nextConfig, updatedContent, 'utf-8')

  // Function to revert back to original content of file
  return () => {
    fs.writeFileSync(nextConfig, currentContent, 'utf-8')
  }
}

const buildNext = async (options: BuildOptions) => {
  // const { nextConfigPath } = options

  // const clearNextConfig = await setNextOptions(nextConfigPath)
  childProcess.execSync(pkg.scripts.build, {
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_MODE: 'standalone',
      NODE_ENV: 'production',
      cwd: process.cwd(),
    },
  })

  // Reverts changes to next project
  // return clearNextConfig
}

const build = async () => {
  const cwd = process.cwd()
  fse.removeSync(path.join(cwd, 'build'))
  await buildNext({ nextConfigPath: path.join(cwd, 'next.config.js') })

  fse.copySync(path.join(cwd, '.next/static'), path.join(cwd, '.next/standalone/apps/web/.next/static'))
  fse.copySync(path.join(cwd, 'public'), path.join(cwd, '.next/standalone/apps/web/public'))
  fse.copySync(path.join(cwd, '.next/standalone/apps/web'), path.join(cwd, 'build'))
  fse.copySync(path.join(cwd, '.next/standalone/node_modules'), path.join(cwd, 'build/node_modules'))
}

build().catch((e) => {
  console.error(e)
  process.exit(1)
})