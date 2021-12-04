import fs from 'fs'
import path from 'path'
import { DatabaseState } from '../lib'

export const SNAPSHOT_FILE: string = 'Snapshot.json'
export const CONFIG_FILE:   string = 'dbdecorconfig.json'
export const PACKAGE_JSON:  string = 'package.json'

export const BASE_DIR:      string = './src'
export const BUILD_DIR:     string = './build'
export const DB_DIR:        string = 'db'
export const MIGRATION_DIR: string = 'migrations'
export const MODEL_DIR:     string = 'models'

//#region Setting Types
export interface Settings
{
    base_directory: string
    build_directory: string
    build_models: string
    src_migrations: string
    src_models: string
}

export interface QueryField
{
    base_directory: string
    build_directory: string
    db_name: string
    context_name: string
    migrations_name: string
    models_name: string
    config_location: string
}
//#endregion

//#region Migration Types
export enum MigrationType
{
    CREATE,
    ALTER,
    DROP
}

export interface ColumnChange
{
    name: string
    type: string
}

export interface Column
{
    old: ColumnChange
    new: ColumnChange
}

export interface Migration
{
    table_name: string
    columns: Column[]
}
//#endregion

export function ready(): [ Settings, DatabaseState, any ]
{
    const settings = getSettings()
    const state = require('../lib').State
    const snapshot = getSnapshot(settings)

    console.log(settings.build_models)
    if (fs.existsSync(settings.build_models))
    {
        const directory = fs.readdirSync(settings.build_models)
        
        for (const file of directory)
        {
            require(path.resolve(settings.build_models, file))
        }
    }

    return [ settings, state, snapshot ]
}
    
function getSnapshot(settings: Settings): any
{
    const dbSnapshotPath = path.resolve(settings.base_directory, SNAPSHOT_FILE)

    if (fs.existsSync(dbSnapshotPath))
    {
        const buffer = fs.readFileSync(dbSnapshotPath)
        const snapshot = JSON.parse(String(buffer))
        
        return snapshot
    }
    
    return { }
}

function getSettings(): Settings
{
    let config: QueryField

    if (fs.existsSync(CONFIG_FILE))
    {
        const str = fs.readFileSync(CONFIG_FILE, { encoding: 'utf-8' })
        config = JSON.parse(str) as QueryField
    }
    else
    {
        const str = fs.readFileSync(PACKAGE_JSON, { encoding: 'utf-8' })
        const packagae_json = JSON.parse(str)
        config = packagae_json['db-decor'] as QueryField
    }

    return {
        base_directory: path.resolve(config.base_directory, config.db_name),
        build_directory: path.resolve(config.build_directory, config.db_name),
        src_migrations: path.resolve(config.base_directory, config.db_name, config.migrations_name),
        src_models: path.resolve(config.base_directory, config.db_name, config.models_name),
        build_models: path.resolve(config.build_directory, config.db_name, config.models_name),
    }
}

export function getTimestamp(): [Date, string]
{
    const today = new Date(Date.now())

    return [
        today,
        [
            today.getUTCFullYear().toString(),
            today.getUTCMonth().toString().padStart(2, '0'),
            today.getUTCDate().toString().padStart(2, '0'),
            today.getUTCHours().toString().padStart(2, '0'),
            today.getUTCMinutes().toString().padStart(2, '0'),
            today.getUTCSeconds().toString().padStart(2, '0')
        ].join('')
    ]
}

export function parseTimestamp(date: string): string
{
    return [
        date.substring(0, 4),
        '-',
        date.substring(4, 6),
        '-',
        date.substring(6, 8),
        ' ',
        date.substring(8, 10),
        ':',
        date.substring(10, 12),
        ':',
        date.substring(12, 14)
    ].join('')
}

export function latestMigration(snapshot: any): number
{
    return -1
}
