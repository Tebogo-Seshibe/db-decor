import path from 'path'
import { latestMigration, ready, SNAPSHOT_FILE } from "./util"

export function rollback(migrationName: string): void
export function rollback(migrationIndex:  number): void
export function rollback(migration?: string | number): void
{
    const [settings, state, snapshot ] = ready()

    const migrationsDir = path.resolve(settings.src_migrations)
    const statePath = path.resolve(migrationsDir, SNAPSHOT_FILE)

    // TODO
    // Find most recently applied migration index
    // Run all the appropriate down migration function in descending order
    // Update the snapshot
    const latest = latestMigration(snapshot);
    downMigrate(latest);
    updateSnapshot(snapshot);
}


async function downMigrate(index: number): Promise<void>
{
    
}

function updateSnapshot(snapshot: any): void
{
    
}