import fs from 'fs'
import inquirer from 'inquirer'
import mustache from 'mustache'
import path from 'path'
import { QueryFields } from '.'
import '../lib/util/DatabaseState'
import dbContextTemplate from './template/dbContext.template'
import { CONFIG_FILE, PACKAGE_JSON, ready } from "./util"

export async function init()
{
    const config = await queryConfig()
    
    writeConfig(config)
    
    const [ settings, ,  ] = ready()

    createFolderStructure(settings.src_models, settings.src_migrations)
    createDatabaseContext(config.context_name, settings.base_directory)
    createSnapshot(settings.base_directory)
}

async function queryConfig(): Promise<QueryFields>
{
    return await inquirer.prompt<QueryFields>(
    [
        {
            type: 'input',
            name: 'base_directory',
            message: 'Where are your source files located?',
            default: './src'
        },
        {
            type: 'input',
            name: 'build_directory',
            message: 'Where are your compiled files located?',
            default: './build'
        },
        {
            type: 'input',
            name: 'db_name',
            message: 'Folder where your db code will be located?',
            default: 'db'
        },
        {
            type: 'input',
            name: 'context_name',
            message: 'Name of the db context?',
            default: 'DBContext'
        },
        {
            type: 'input',
            name: 'migrations_name',
            message: 'Folder name where the models will defined?',
            default: 'migrations'
        },
        {
            type: 'input',
            name: 'models_name',
            message: 'Folder name where the migrations will be generated?',
            default: 'models'
        },
        {
            type: 'list',
            name: 'config_location',
            message: 'Where would you like to store these setting?',
            choices: [ CONFIG_FILE, PACKAGE_JSON ]
        },
    ])
}

function createFolderStructure(modelsDir: string, migrationsDir: string): void
{
    if (!fs.existsSync(modelsDir))
    {
        fs.mkdirSync(modelsDir, { recursive: true })
    }

    if (!fs.existsSync(migrationsDir))
    {
        fs.mkdirSync(migrationsDir, { recursive: true })
    }
}

function createDatabaseContext(contextName: string, rootDir: string): void
{
    fs.writeFileSync(
        path.resolve(rootDir, `${contextName}.ts`), 
        mustache.render(dbContextTemplate, { contextName })
    )
}

function createSnapshot(rootDir: string): void
{
    fs.writeFileSync(path.resolve(rootDir, 'snapshot.json'), JSON.stringify({}))
}

function writeConfig(config: QueryFields)
{
    if (config.config_location === CONFIG_FILE)
    {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, '\t'))
    }
    else
    {
        const pakageJSONstr = fs.readFileSync(PACKAGE_JSON, { encoding: 'utf-8' })
        const json = JSON.parse(pakageJSONstr)
        json['db-decor'] = config
        
        fs.writeFileSync(PACKAGE_JSON, JSON.stringify(json, null, '\t'))
    }
}
