import fs from 'fs'
import mustache from 'mustache'
import path from 'path'
import createTemplate from './templates/create.template'
import { getTimestamp, MigrationType, ready } from './util'

export function add(migrationName: string): void
{
    const [settings, state, snapshot] = ready()
    const [date, timestamp] = getTimestamp()
    const stampedMigrationName = path.resolve(settings.src_migrations, `${timestamp}_${migrationName}.ts`)

    // Get current snapshot
    switch (determineMethod())
    {
        case MigrationType.CREATE:
            break

        case MigrationType.ALTER:
            break

        case MigrationType.DROP:
            break
    }

    fs.writeFileSync(stampedMigrationName, mustache.render(createTemplate,
    {
        migrationName: migrationName,
        migrationTimestamp: timestamp,
        up:
        {
            table: migrationName,
            columns:
            [
                { name: 'id', type: 'serial' },
                { name: 'name', type: 'varchar' },
                { name: 'surname', type: 'varchar' },
                { name: 'age', type: 'int' },
            ]
        },
        down: 'world'

    }, { encoding: 'utf-8' }))
    console.log(state)
}

function determineMethod(): MigrationType
{
    return MigrationType.CREATE
}
