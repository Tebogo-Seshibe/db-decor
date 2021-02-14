import fs from 'fs'
import path from 'path'
import { getTimestamp, Settings } from "./util"

function migration(className: string): string
{
    const query: string[] = []

    // Get current state of db
    query.push(`import { Migration, MigrationBuilder } from 'db-decor'`)
    query.push(``)
    query.push(`class ${ className } implements Migration`)
    query.push(`{`)
    query.push(`\tpublic up(migrationBuilder: MigrationBuilder): void`)
    query.push(`\t{`)
    query.push(`\t\tmigrationBuilder`)
    query.push(`\t\t\t.createTable(`)
    query.push(`\t\t\t{`)
    query.push(`\t\t\t\tname: 'example'`)
    query.push(`\t\t\t})`)
    query.push(`\t\t\t.build()`)
    query.push(`\t}`)
    query.push(`\tpublic down(migrationBuilder: MigrationBuilder): void`)
    query.push(`\t}`)
    query.push(`}`)
    query.push(``)
    query.push(`export default ${ className }`)
    
    return query.join('\n')
}

function up(): string
{
    const query: string[] = []

    return query.join('\n')
}

function down(): string
{
    const query: string[] = []

    return query.join('\n')
}

export default function main(settings: Settings, migrationName: string)
{
    const [date, timestamp] = getTimestamp()
    const filename = `${timestamp}_${migrationName}.ts`
    const migrationDir = path.resolve(settings.rootDir, settings.migrationDir)
    
    if (!fs.existsSync(migrationDir))
    {
        fs.mkdirSync(migrationDir, { recursive: true })
    }    

    fs.writeFileSync(path.resolve(migrationDir, filename), migration(migrationName), { encoding: 'utf-8' })
}
