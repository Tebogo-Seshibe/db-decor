import { Client } from 'pg'
import dotenv from 'dotenv'
import arg from 'arg'

dotenv.config()

type Method = 'add' | 'remove' | 'migrate' | 'test'
interface Arguments
{
    [key: string]: string | number | undefined

    add?: string
    update?: string | number
    remove?: string | number
    migrate?: string | number
    project?: string
}

function handleArguments(raw: string[]): Arguments
{
    const args = arg({
        '--add': String,
        '-a': '--add',

        '--update': String,
        '-u': '--update',
        
        '--update-index': Number,
        '-ui': '--update-index',
        
        '--remove': String,
        '-r': '--remove',
        
        '--remove-index': Number,
        '-ri': '--remove-index',
        
        '--migrate': String,
        '-m': '--migrate',
        
        '--migrate-index': Number,
        '-mi': '--migrate-index',
        
        '--project': String,
        '-p': '--project'
    },{
        argv: raw
    })

    return {
        name: args._.join(','),
        add: args['--add'] ?? undefined,
        update: args['--update'] ?? args['--update-index'],
        remove: args['--remove'] ?? args['--remove-index'],
        migrate: args['--migrate'] ?? args['--migrate-index'],
        project: args['--project']
    }
}

// const dbClient = new Client(
// {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     port: Number(process.env.DB_PORT ?? '5432'),
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

function getTimestamp(): [Date, string]
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
function validate(properties: Arguments)
{
    const flagsAdded = Object.keys(properties).reduce((curr, key) => curr + (properties[key] === undefined ? 0 : 1), 0)
    
    if (flagsAdded === 0)
    {
        throw 'Invalid command provided. No method requested.'
    }

    if (flagsAdded > 1)
    {
        throw 'Invalid command provided. Multiple methods requested.'
    }
    
}

async function main(method: Method, ...args: string[]): Promise<void>
{
    let properties
    try
    {
        properties = handleArguments(args)
        validate(properties)

        console.log(properties)
    }
    catch (e: any)
    {
        if (e instanceof arg.ArgError)
        {
            console.log(e.message)
        }
        else
        {
            console.log(e)
        }
        console.log(properties)
    }

    // if (!method)
    // {
    //     throw `Method required`
    // }

    // if (!args)
    // {
    //     throw `Arguments required`
    // }
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
export { main }