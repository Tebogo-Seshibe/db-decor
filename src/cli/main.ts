import dotenv from 'dotenv'
import fs from 'fs'
import inquirer from 'inquirer'
import '../lib/util/DatabaseState'
import init from './init'
import { Arguments, Method, Settings } from './util'

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

function loadSettings(): Settings
{
    let settings: Settings | undefined

    try
    {
        const str = fs.readFileSync('package.json', { encoding: 'utf-8' })
        const json = JSON.parse(str)
        
        settings = json['db-decor'] as Settings

        settings = {
            ...settings,
            build: {
                ...settings?.build,
                cmd: json['scripts'][settings?.build?.cmd]
            }
        }
    }
    catch(e)
    {
        console.log(e)
    }
    finally
    {
        return {
            baseDir: settings?.baseDir ?? 'src/db',
            migrations: settings?.migrations ?? 'migrations',
            models: settings?.models ?? 'models',
            build: {
                cmd: settings?.build?.cmd ?? 'echo no build command provided',
                dir: settings?.build?.dir ?? 'dist'
            }
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

export async function main(...args: string[]): Promise<void>
{
    try
    {
        const [method, ...parameters] = args.slice(2)
        const settings = loadSettings()
        const properties = await handleArguments(method, ...parameters)

        validate(properties)

        if (properties.init)
        {
            init(settings)
        }
        // else if (properties.add !== undefined)
        // {
        //     add(settings, properties.add)
        // }
        // else if (properties.migrate !== undefined)
        // {
        //     migrate(settings, properties.migrate)
        // }
        // else if (properties.update !== undefined)
        // {
        //     update(settings, properties.update)
        // }
        // else if (properties.remove !== undefined)
        // {
        //     remove(settings, properties.remove)
        // }
    }
    catch (e: any)
    {
        console.error(e)
    }
}
