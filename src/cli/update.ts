import fs from 'fs'
import path from 'path'
import { getTimestamp, ready, SNAPSHOT_FILE } from "./util"

export function update(migrationName: string): void
export function update(migrationIndex: number): void
export function update(migration?: string | number): void
{
    const [settings, state] = ready()

    const migrationsDir = path.resolve(settings.src_migrations)
    const statePath = path.resolve(migrationsDir, SNAPSHOT_FILE)  
    
    fs.writeFileSync(statePath, JSON.stringify(state), { encoding: 'utf-8' })
}
