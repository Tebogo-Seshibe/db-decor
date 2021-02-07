import fs from 'fs'
import path from 'path'
import { getTimestamp, Settings } from "./util"

function main(settings: Settings)
{
    const [date, timestamp] = getTimestamp()
    const className = `DBContext`

    const rootDir = path.resolve(settings.rootDir)
    const migrationDir = path.resolve(settings.rootDir, settings.migrationDir)
    const modelDir = path.resolve(settings.rootDir, settings.modelDir)
    
    if (!fs.existsSync(migrationDir))
    {
        fs.mkdirSync(migrationDir, { recursive: true })
    }
    
    if (!fs.existsSync(modelDir))
    {
        fs.mkdirSync(modelDir, { recursive: true })
    }

    fs.writeFileSync(path.resolve(rootDir, `${className}.ts`), createContext(className), { encoding: 'utf-8' })
}

function createContext(className: string): string
{
    return [
        `import { Context } from 'db-decor'`,
        ``,
        `class ${ className } extends Context`,
        `{`,
        `\tconstructor(connectionString: string)`,
        `\t{`,
        `\t\tsuper(connectionString)`,
        `\t}`,
        `}`,
        ``,
        `export default ${ className }`,
        ``
    ].join('\n')
}

export default main
