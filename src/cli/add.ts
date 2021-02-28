import fs from 'fs'
import path from 'path'
import { DatabaseState, TableInfo } from '../lib'
import { getTimestamp, Settings } from "./util"

function trim(strings: TemplateStringsArray, ...values: any[]): string
{
    let output: string = ''
    
    strings.forEach((s, i) => {
        output += s + (values[i] ?? '')
    })

    return output
        .split(/(?:\r\n|\n|\r)/)
        .map(x => x.replace(/^\s+/gm, ''))
        .join('\n')
}

function tab(strings: TemplateStringsArray, ...values: any[]): string
{
    let output: string = ''
    
    strings.forEach((s, i) => {
        output += s + (values[i] ?? '')
    })

    return output
        .split(/(?:\r\n|\n|\r)/)
        .map(x => x.replace(/^\s/g, '\t'))
        .join('\n')
}

function migration(className: string, state: DatabaseState): string
{
    return trim`import { Migration, MigrationBuilder } from 'db-decor'

    export class ${ className } implements Migration
    {` + 
    up(state) + 
    '\n'+
    down(state) + 
    trim`
    }
    `
}

function up(state: DatabaseState): string
{
    const tables = Object.keys(state).map(key => state[key])

    return `
    public up(migrationBuilder: MigrationBuilder): void
    {`+
        tables.map(tableInfo => tableUp(tableInfo) + '\n' + columnUp(tableInfo).join('\n')).join('\n') +
    `
    
        migrationBuilder
            .build()
    }`
}

function down(state: DatabaseState): string
{
    const tables = Object.keys(state).map(key => state[key])

    return `
    public down(migrationBuilder: MigrationBuilder): void
    {`+
        tables.map(tableInfo => tableDown(tableInfo)).join('\n') +
    `   

        migrationBuilder
            .build()
    }`
}

function tableUp(tableInfo: TableInfo): string
{
    return `
        migrationBuilder
            .createTable('${ tableInfo.table.name }')`
}

function tableDown(tableInfo: TableInfo): string
{
    return `
        migrationBuilder
            .dropTable('${ tableInfo.table.name }')`
}

function columnUp(tableInfo: TableInfo): string[]
{
    var columns = Object.keys(tableInfo.columns).map(key => tableInfo.columns[key])

    return columns.map(x => `\t\t\t.addColumn('${ x.columnName }', '${ x.columnType }', ${ JSON.stringify(x.properties) })`)
}

function columnDown(tableInfo: TableInfo): string[]
{
    var columns = Object.keys(tableInfo.columns).map(key => tableInfo.columns[key])

    return columns.map(x => x.field)
}


export function add(settings: Settings, state: DatabaseState, migrationName: string): void
{
    const [date, timestamp] = getTimestamp()
    const stampedMigrationName = path.resolve(settings.baseDir, settings.migrations, `${timestamp}_${migrationName}.ts`)
    
    fs.writeFileSync(stampedMigrationName, migration(migrationName, state), { encoding: 'utf-8' })
}
