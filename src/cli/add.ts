import mustache from 'mustache'
import path from 'path'
import fs from 'fs'
import { DatabaseState } from '../lib'
import createTemplate from './templates/create.template'
import alterTemplate from './templates/alter.template'
import dropTemplate from './templates/drop.template'
import { getTimestamp, Settings, setup } from "./util"

enum MigrationType { CREATE, ALTER, DROP }

export async function add(migrationName: string): Promise<void>
{
    const [settings, state] = await setup()
    const [date, timestamp] = getTimestamp()
    const stampedMigrationName = path.resolve(settings.baseDir, settings.migrations, `${timestamp}_${migrationName}.ts`)

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