import path from 'path'
import fs from 'fs'
import { getTimestamp, parseTimestamp, Settings, setup, stateFileName } from "./util"
import { TableInfo } from '../lib'
import chalk from 'chalk'

export async function list(all: boolean): Promise<void>
{
    const [settings, state] = await setup()
    const migrationsDir = path.resolve(settings.baseDir, settings.migrations)
    const statePath = path.resolve(migrationsDir, stateFileName)
    
    const migrations = getMigrations(path.resolve(migrationsDir))
    
    console.log('┌───────┬────────────────────────┬──────────────────────┐')
    console.log('│ ' + chalk.bold('Index') + ' │ ' + chalk.bold('Name') + '                   │ ' + chalk.bold('Timestamp') + '            │')
    console.log('├───────┼────────────────────────┼──────────────────────┤')
    migrations.forEach((migration: string, index: number): void =>
    {
        const [ timestamp, name ] = migration.split('_')
        
        console.log(`│ ${ chalk.white(index.toString().padEnd(5)) } │ ${ chalk.white(name.toString().padEnd(22)) } │ ${ chalk.white(parseTimestamp(timestamp).padEnd(20)) } │`)
    })
    console.log('└───────┴────────────────────────┴──────────────────────┘')
}

function getMigrations(migrationDir: string): string[]
{
    const directory = fs.readdirSync(migrationDir)
    const migrations: string[] = []
    
    directory.sort().forEach(file => migrations.push(file.substring(0, file.length - 3)))

    return migrations
}

