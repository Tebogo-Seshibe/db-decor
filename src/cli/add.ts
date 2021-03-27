import fs from 'fs'
import path from 'path'
import { ColumnDetails, DatabaseState, TableDetails, TableInfo } from '../lib'
import { getTimestamp, Settings } from "./util"
import migrationTemplate from './addTemplate'

function trim(strings: TemplateStringsArray, ...values: any[]): string
{
    let output: string = ''
    
    strings.forEach((s, i) => {
        output += s + (values[i] ?? '')
    })

    return output.split(/(?:\r\n|\n|\r)/).map(x => x.trim()).join('\n')
}

function tab(strings: TemplateStringsArray, ...values: any[]): string
{
    let output: string = ''
    
    strings.forEach((s, i) => {
        output += s + (values[i] ?? '')
    })

    return output.split(/(?:\r\n|\n|\r)/).map(x => '\t' + x).join('\n')
}

function migration(className: string, state: DatabaseState): string
{
    return migrationTemplate
        .replace('{ __migration-up__ }', up(state))
        .replace('{ __migration-down__ }', down(state))
}

function up(state: DatabaseState): string
{
    const tables = Object.keys(state)
        .map(key => state[key])
        .map(({ table, columns }: TableInfo)=> {
            return '\t\tmigrationBuilder\n' + 
                tableUp(table)+ 
                '\n' +
                Object.keys(columns)
                    .map(key => columns[key])
                    .map((column: ColumnDetails) => columnUp(column))
                    .join('\n') +
                '\n'
        })

    return tables.join('\n')
}

function down(state: DatabaseState): string
{
    const tables = Object.keys(state)
        .map(key => state[key])
        .map(({ table, columns }: TableInfo)=> {
            return '\t\tmigrationBuilder\n' +
                tableDown(table) +
                '\n' +
                Object.keys(columns)
                    .map(key => columns[key])
                    .map((column: ColumnDetails) => columnDown(column))
                    .join('\n') +
                    '\n'
        })

    return tables.join('\n')
}

function tableUp(table: TableDetails): string
{
    return `\t\t\t.createTable('${ table.name }')`
}

function tableDown(table: TableDetails): string
{
    return `\t\t\t.dropTable('${ table.name }')`
}

function columnUp(column: ColumnDetails): string
{
    return `\t\t\t.addColumn('${ column.columnName }', '${ column.columnType }', ${ JSON.stringify(column.properties) })`
}

function columnDown(column: ColumnDetails): string
{
    return `\t\t\t.removeColumn('${ column.columnName }', '${ column.columnType }', ${ JSON.stringify(column.properties) })`
}


export function add(settings: Settings, state: DatabaseState, migrationName: string): void
{
    const [date, timestamp] = getTimestamp()
    const stampedMigrationName = path.resolve(settings.baseDir, settings.migrations, `${timestamp}_${migrationName}.ts`)
    
    fs.writeFileSync(stampedMigrationName, migration(migrationName, state), { encoding: 'utf-8' })
}
