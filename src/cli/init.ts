import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'
import '../lib/util/DatabaseState'
import dbContextTemplate from './templates/dbContext.template'
import { Settings } from "./util"
import mustache from 'mustache'

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

function writeSettings(settings: Settings, separateConfig: boolean)
{
    
    if (separateConfig)
    {
        fs.writeFileSync('dbdecorconfig.json', JSON.stringify(settings))
    }
    else
    {
        
        const pakageJSONstr = fs.readFileSync('package.json', { encoding: 'utf-8' })
        const json = JSON.parse(pakageJSONstr)
        json['db-decor'] = settings as Settings
        
        fs.writeFileSync('package.json', json)
    }
}

export async function init()
{
    const answers = await inquirer.prompt(
    [
        {
            type: 'input',
            name: 'sourceDir',
            message: 'Where are your source files located?',
            default: './src/db'
        },
        {
            type: 'input',
            name: 'buildDir',
            message: 'Where are your compiled files located?',
            default: './build/src/db'
        },
        {
            type: 'input',
            name: 'contextName',
            message: 'Name of the db context?',
            default: 'DBContext'
        },
        {
            type: 'input',
            name: 'modelsDir',
            message: 'Folder name where the models will defined?',
            default: 'models'
        },
        {
            type: 'input',
            name: 'migrationsDir',
            message: 'Folder name where the migrations will be generated?',
            default: 'migrations'
        },
        {
            type: 'list',
            name: 'configLocation',
            message: 'Where would you like to store these setting?',
            choices: [ 'dbdecorconfig.json', 'package.json' ]
        },
    ])
    
    const settings: Settings =
    {
        baseDir: answers.sourceDir,
        buildDir: answers.buildDir,
        models: answers.modelsDir,
        migrations: answers.migrationsDir
    }
    writeSettings(settings, true)

    const { baseDir, models, migrations } = settings
    const rootDir = path.resolve(baseDir)
    const modelsDir = path.resolve(baseDir, models)
    const migrationsDir = path.resolve(baseDir, migrations)
    
    createFolderStructure(modelsDir, migrationsDir)
    createDatabaseContext(answers.contextName, rootDir)
    createSnapshot(rootDir)  
    
}