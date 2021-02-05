import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

type Method = 'add' | 'remove' | 'migrate' | 'test'

const dbClient = new Client(
{
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT ?? '5432'),
    ssl: {
        rejectUnauthorized: false
    }
})

const getTimestamp = (): [Date, string] =>
{
    const today = new Date(Date.now())

    return [
        today,
        [
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate(),
            today.getUTCHours(),
            today.getUTCMinutes(),
            today.getUTCSeconds()
        ].join('')
    ]
}

const main = async () =>
{
    const [method, ...args] = [process.argv[2] as Method, ...process.argv.slice(3)]

    if (!method)
    {
        throw `Method required`
    }

    if (!args)
    {
        throw `Arguments required`
    }

    var flags = args.filter(x => x.indexOf('-') === 0)
    console.log(args)
    console.log(flags)
    // switch (method)
    // {
    //     case 'add':
    //         await addMigration(...args)
    //         break

    //     case 'remove':
    //         await removeMigration(...args)
    //         break

    //     case 'migrate':
    //         await migrate(...args)
    //         break

    //     default:
    //         throw `Unrecognized method: ${ method }`
    // }

    // await dbClient.connect()
    // await dbClient.end()
}

const addMigration = async (name: string) =>
{
    const [date, timestamp] = getTimestamp()

    console.log(`Adding new migration: ${ name }_${timestamp}\n`)
    console.log(date)
    dbClient.connect()
    // dbClient.query()
    dbClient.end()
}

const removeMigration = async (name: string | number) =>
{
    console.log(`Removing migration: ${ name }\n`)
}

const migrate = async (name?: string) =>
{
    dbClient.connect()
    dbClient.query('')
    console.log(`Migrating to: ${ name }\n`)
}

main().catch(console.error)
