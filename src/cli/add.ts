import mustache from 'mustache'
import path from 'path'
import fs from 'fs'
import { DatabaseState } from '../lib'
import migrationTemplate from './templates/add.template'
import { getTimestamp, Settings, setup } from "./util"

export async function add(migrationName: string): Promise<void>
{
    const [settings, state] = await setup()
    const [date, timestamp] = getTimestamp()
    const stampedMigrationName = path.resolve(settings.baseDir, settings.migrations, `${timestamp}_${migrationName}.ts`)

    fs.writeFileSync(stampedMigrationName, mustache.render(migrationTemplate,
    {
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
