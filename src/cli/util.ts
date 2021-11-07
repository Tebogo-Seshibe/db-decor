import fs from 'fs'
import path from 'path'
import { DatabaseState } from '../lib'

export const stateFileName: string = 'Snapshot.json'
export interface Settings
{
    baseDir: string
    buildDir: string
    migrations: string
    models: string
}

export function setup(): [ Settings, DatabaseState ]
{
    const { baseDir, buildDir, models } = loadSettings()
    const dbModelsPath = path.resolve(buildDir, models)
    if (fs.existsSync(dbModelsPath))
    {
        require(dbModelsPath)
    }
    const { State } = require('../lib')
    return [ loadSettings(), State ]
}
    

function loadSettings(): Settings
{
    let settings: Settings | undefined
    
    try
    {
        let str: string
        let json: any
        
        if (fs.existsSync('dbdecorconfig.json'))
        {
            str = fs.readFileSync('dbdecorconfig.json', { encoding: 'utf-8' })
            settings = JSON.parse(str) as Settings
        }
        else
        {
            str = fs.readFileSync('package.json', { encoding: 'utf-8' })
            json = JSON.parse(str)
            settings = json['db-decor'] as Settings
        }
    }
    catch (e)
    {
        console.log(e)
    }

    return {
        ...settings as Settings,
        
        buildDir: settings?.buildDir ?? './build/src',
        baseDir: settings?.baseDir ?? './src/db',
        migrations: settings?.migrations ?? 'migrations',
        models: settings?.models ?? 'models'
    }
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