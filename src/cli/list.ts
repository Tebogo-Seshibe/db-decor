import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { parseTimestamp, ready, SNAPSHOT_FILE } from "./util"

export function list(): void
{ 
    const [settings, state, snapshot] = ready()
    const migrationsDir = path.resolve(settings.baseDir, settings.migrations)
    const statePath = path.resolve(migrationsDir, SNAPSHOT_FILE)
    
    const migrations = getMigrations(path.resolve(migrationsDir))
    let migrationList: string = '\n'
        + chalk.blue('┌───────┬────────────────────────┬──────────────────────┐\n')
        + chalk.blue('│ ') 
        + chalk.bold('Index') 
        + chalk.blue(' │ ') 
        + chalk.bold('Name'.padEnd(22)) 
        + chalk.blue(' │ ') 
        + chalk.bold('Date'.padEnd(20)) 
        + chalk.blue(' │\n')
        + chalk.blue('├───────┼────────────────────────┼──────────────────────┤\n')

    migrations.forEach((migration: string, index: number): void =>
    {
        const [ timestamp, name ] = migration.split('_')
        const colour = index === 0
            ? chalk.green
            : chalk.white
        
        migrationList += chalk.blue('│ ') 
            + colour(index.toString().padEnd(5)) 
            + chalk.blue(' │ ') 
            + colour(name.toString().padEnd(22)) 
            + chalk.blue(' │ ') 
            + colour(parseTimestamp(timestamp).padEnd(20)) 
            + chalk.blue(' │\n')
    })

    migrationList += chalk.blue('└───────┴────────────────────────┴──────────────────────┘\n')

    console.log(migrationList)

    console.log(snapshot)
}

function getMigrations(migrationDir: string): string[]
{    
    return fs.readdirSync(migrationDir)
        .sort()
        .map(file => file.substring(0, file.length - 3))
}
