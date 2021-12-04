import fs from 'fs'
import path from 'path'
import { getTimestamp, ready, SNAPSHOT_FILE } from "./util"

export function remove(): void
{
    const [settings, state] = ready()
    
    const migrationsDir = path.resolve(settings.src_migrations)
    const statePath = path.resolve(migrationsDir, SNAPSHOT_FILE)
    
    const [date, timestamp] = getTimestamp()    
    
    fs.writeFileSync(statePath, JSON.stringify(state), { encoding: 'utf-8' })
    
}
