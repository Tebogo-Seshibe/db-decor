import path from 'path'
import fs from 'fs'
import { getTimestamp, Settings, stateFileName } from "./util"
import { TableInfo } from '../lib'

export function rollback(settings: Settings, state: Record<string, TableInfo>): void
export function rollback(settings: Settings, state: Record<string, TableInfo>, migrationName: string): void
export function rollback(settings: Settings, state: Record<string, TableInfo>, migrationIndex:  number): void
export function rollback(settings: Settings, state: Record<string, TableInfo>, migration?: string | number): void
{
    const migrationsDir = path.resolve(settings.baseDir, settings.migrations)
    const statePath = path.resolve(migrationsDir, stateFileName)
    
    const [date, timestamp] = getTimestamp()    
    
    fs.writeFileSync(statePath, JSON.stringify(state), { encoding: 'utf-8' })
}
