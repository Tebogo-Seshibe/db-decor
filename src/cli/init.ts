import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import '../lib/util/DatabaseState'
import { Settings } from "./util"

function createContext(className: string): string
{
    return [
        `import { DatabaseState } from 'db-decor'`,
        ``,
        `console.log(DatabaseState)`,
        ``
    ].join('\n')
}

function createFolders(): void
{

}

export function init(settings: Settings, state: any)
{
    const className = `DBContext`

    const modelsDir = path.resolve(settings.baseDir, settings.models)
    const migrationsDir = path.resolve(settings.baseDir, settings.migrations)
    
    if (!fs.existsSync(modelsDir))
    {
        fs.mkdirSync(modelsDir, { recursive: true })
    }

    if (!fs.existsSync(migrationsDir))
    {
        fs.mkdirSync(migrationsDir, { recursive: true })
    }
}
