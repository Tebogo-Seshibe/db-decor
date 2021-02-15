import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import '../lib/util/DatabaseState'
import { getTimestamp, Settings } from "./util"

function createContext(className: string): string
{
    return [
        `import { DatabaseState } from 'db-decor'`,
        ``,
        `console.log(DatabaseState)`,
        ``
    ].join('\n')
}

export default function main(settings: Settings)
{
    const [date, timestamp] = getTimestamp()
    const className = `DBContext`

    const rootDir = path.resolve(settings.baseDir)
    const migrationDir = path.resolve(settings.baseDir, settings.migrations)
    const modelDir = path.resolve(settings.baseDir, settings.models)
    
    if (!fs.existsSync(migrationDir))
    {
        fs.mkdirSync(migrationDir, { recursive: true })
    }
    
    if (!fs.existsSync(modelDir))
    {
        fs.mkdirSync(modelDir, { recursive: true })
    }

    // fs.writeFileSync(path.resolve(rootDir, `${className}.ts`), createContext(className), { encoding: 'utf-8' })
    
    exec(settings.build.cmd, () => {        
        const pah = path.resolve(settings.build.dir, settings.baseDir, className)
        console.log(pah)

        exec(`node ${pah}`, (ex, success, err) => {
            console.log(DatabaseState)
        })
    })
}