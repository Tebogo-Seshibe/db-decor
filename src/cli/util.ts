import fs from 'fs'
import path from 'path'

export const stateFileName: string = 'Snapshot.json'
export interface Settings
{
    baseDir: string
    buildDir: string
    migrations: string
    models: string
    buildCmd: string
}

export function loadSettings(): Settings
{
    let settings: Settings | undefined
    
    try
    {
        let str: string
        let json: any
        
        if (fs.existsSync('db-decor.config.json'))
        {
            str = fs.readFileSync('db-decor.config.json', { encoding: 'utf-8' })
            settings = JSON.parse(str) as Settings
        }
        else
        {
            str = fs.readFileSync('package.json', { encoding: 'utf-8' })
            json = JSON.parse(str)
            settings = json['db-decor'] as Settings

            settings = {
                ...settings,
                buildCmd: json['scripts'][settings?.buildCmd] ?? settings?.buildCmd
            }
        }
    }
    catch (e)
    {
        console.log(e)
    }

    settings = {
        ...settings as Settings
    }
    
    settings.buildDir = path.resolve(settings?.buildDir ?? 'dist', settings?.baseDir ?? 'src/db')
    settings.baseDir = path.resolve(settings?.baseDir ?? 'src/db')
    settings.buildCmd = settings?.buildCmd ?? 'echo no build command provided'
    settings.migrations = settings?.migrations ?? 'migrations'
    settings.models = settings?.models ?? 'models'

    return settings
}

export function getTimestamp(): [Date, string]
{
    const today = new Date(Date.now())

    return [
        today,
        [
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate(),
            today.getUTCHours(),
            today.getUTCMinutes(),
            today.getUTCSeconds()
        ].join('')
    ]
}