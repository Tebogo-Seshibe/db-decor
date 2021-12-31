import fs from 'fs'
import mustache from 'mustache'
import path from 'path'
import { Migration } from '.'
import { DatabaseState } from '../lib'
import alterTemplate from './template/alter.template'
import createTemplate from './template/create.template'
import dropTemplate from './template/drop.template'
import { getTimestamp, MigrationType, ready } from './util'

export function add(migrationName: string): void
{
    const [settings, state, snapshot] = ready()
    const [, timestamp] = getTimestamp()
    const stampedMigrationName = path.resolve(settings.src_migrations, `${timestamp}_${migrationName}.ts`)

    let migrationModel: Migration
    let migrationTemplate: string

    switch (determineMethod(state, snapshot))
    {
        case MigrationType.CREATE:
            migrationModel = createMigration(state, snapshot)
            migrationTemplate = createTemplate
            break
            
        case MigrationType.ALTER:
            migrationModel = alterMigration(state, snapshot)
            migrationTemplate = alterTemplate
            break
                
        case MigrationType.DROP:
            migrationModel = dropMigration(state, snapshot)
            migrationTemplate = dropTemplate
            break
    }

    fs.writeFileSync(stampedMigrationName, mustache.render(migrationTemplate,
    {
        migrationName: migrationName,
        migrationTimestamp: timestamp,
        ...migrationModel

    }, { encoding: 'utf-8' }))
}

function determineMethod(state: DatabaseState, snapshot: any): MigrationType
{
    return MigrationType.CREATE
}

function createMigration(state: DatabaseState, snapshot: any): Migration
{
    throw new Error('Function not implemented.')
}

function alterMigration(state: DatabaseState, snapshot: any): Migration
{
    throw new Error('Function not implemented.')
}

function dropMigration(state: DatabaseState, snapshot: any): Migration
{
    throw new Error('Function not implemented.')
}
