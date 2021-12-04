import fs from 'fs'
import path from 'path'
import { getTimestamp, ready, SNAPSHOT_FILE } from "./util"

export function rollback(migrationName: string): void
export function rollback(migrationIndex:  number): void
export function rollback(migration?: string | number): void
{
    const [settings, state] = ready()

    const migrationsDir = path.resolve(settings.baseDir, settings.migrations)
    const statePath = path.resolve(migrationsDir, SNAPSHOT_FILE)
    
    const [date, timestamp] = getTimestamp()    
    
    fs.writeFileSync(statePath, JSON.stringify(state), { encoding: 'utf-8' })
}
