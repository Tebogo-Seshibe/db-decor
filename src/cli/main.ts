import { Client } from 'pg'
import dotenv from 'dotenv'
import inquirer from 'inquirer'
import fs from 'fs'
import add from './add'
import { Arguments, Method, Settings } from './util'
import migrate from './migrate'
import update from './update'
import remove from './remove'
import init from './init'

dotenv.config()

async function handleArguments(method: string, ...parameters: string[]): Promise<Arguments>
{
    var rec: Record<string, any> = {'name': 'hello'}
    
    switch (method as Method)
    {
        case 'init':
            return {
                init: true
            }

        case 'add':
            let addName: string | undefined
            if (parameters.length === 0)
            {
                const answer = await inquirer.prompt(
                    {
                        type: 'input',
                        name: 'addName',
                        message: 'Please enter the name of the migration:',
                    }
                )

                addName = answer.addName
            }
            else
            {
                addName = parameters[0]
            }
            return {
                add: addName
            }
        
            
        case 'migrate':
            break

        case 'remove':
            break
        
        default:
            break
    }

    return {}
}

function parsePackageJSON(): Settings
{
    let settings: Settings | undefined

    try
    {
        const str = fs.readFileSync('package.jon', { encoding: 'utf-8' })
        const json = JSON.parse(str)
        
        settings = json['db-decor'] as Settings
    }
    finally
    {
        return {
            projectName: settings?.projectName ?? '',
            rootDir: settings?.rootDir ?? 'src/db',
            migrationDir: settings?.migrationDir ?? 'migrations',
            modelDir: settings?.modelDir ?? 'models'
        }
    }
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
        throw 'Invalid command provided. Too many arguments provided.'
    }    
}

async function main(...args: string[]): Promise<void>
{
    try
    {
        const [method, ...parameters] = args.slice(2)
        const settings = parsePackageJSON()
        const properties = await handleArguments(method, ...parameters)

        validate(properties)
        

        if (properties.init)
        {
            init(settings)
        }
        else if (properties.add !== undefined)
        {
            add(settings, properties.add)
        }
        else if (properties.migrate !== undefined)
        {
            migrate(settings, properties.migrate)
        }
        else if (properties.update !== undefined)
        {
            update(settings, properties.update)
        }
        else if (properties.remove !== undefined)
        {
            remove(settings, properties.remove)
        }
    }
    catch (e: any)
    {
        console.log(e)
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