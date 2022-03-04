import { Resolver } from '@parcel/plugin'
import { relativePath } from '@parcel/utils'
import path from 'path'

declare global {
  interface Window {
    PARCEL_IMPORT_MAP: Record<string, any>;
  }
}

export default new Resolver({
  async resolve({ specifier, dependency, options }) {

    if (specifier.startsWith('https://') || specifier.startsWith('http://')) {
      if (dependency.priority !== 'lazy') {
        return {
          diagnostics: [
            {
              message: 'Import by url support only for async import',
              hints: [`Use import("${specifier}") instead`]
            }]
        }
      }

      let noFoundEnv

      const url = specifier.replace(/\$(\w+)/, (env) => {
        // substring: remove $
        const value = process.env[env.substring(1)]
        if (!value) {
          noFoundEnv = env
          return ''
        }
        return value
      })

      if (noFoundEnv) {
        return {
          diagnostics: [
            {
              message: `Cannot find env with name ${noFoundEnv}`,
            }]
        }
      }

      return {
        filePath: path.resolve(options.projectRoot, 'index.js'),
        code: `
          module.exports = new Promise((resolve) => {
            fetch("${url}").then(res => res.text())
            .then(text => {
              var parcelRemoteModuleCallback = resolve
              eval(\`
                \${text}
              \`)
            })
          })
        `,
        priority: 'sync'
      }
    }

    if (dependency.isEntry && specifier.match(/\.(tsx?|js)$/)) {
      const dir = path.dirname(specifier)

      return {
        filePath: path.join(
          dir,
          'index.js',
        ),
        code: `
        const mdl = require("${relativePath(dir, specifier)}")
        parcelRemoteModuleCallback(mdl)
       `,
      }
    }

    return null

  }
})
