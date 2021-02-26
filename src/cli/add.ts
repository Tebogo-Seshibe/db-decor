import path from 'path'
import fs from 'fs'
import { TableInfo } from '../lib'
import { getTimestamp, Settings, stateFileName } from "./util"

function migration(className: string): string
{
    const query: string[] = []

    return query.join('\n')
}

function up(): string
{
    const query: string[] = []

    return query.join('\n')
}

function down(): string
{
    const query: string[] = []

    return query.join('\n')
}

export function add(settings: Settings, state: Record<string, TableInfo>): void
export function add(settings: Settings, state: Record<string, TableInfo>, migrationName: string): void
export function add(settings: Settings, state: Record<string, TableInfo>, migrationIndex: number): void
export function add(settings: Settings, state: Record<string, TableInfo>, migration?: string | number): void
{
    const migrationsDir = path.resolve(settings.baseDir, settings.migrations)
    const statePath = path.resolve(migrationsDir, stateFileName)
    
    const [date, timestamp] = getTimestamp()    
    
    fs.writeFileSync(statePath, JSON.stringify(state), { encoding: 'utf-8' })
}
