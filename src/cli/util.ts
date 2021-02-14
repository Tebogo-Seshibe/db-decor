export type Method = 'init' | 'add' | 'remove' | 'migrate' | 'test'

export interface Arguments
{
    [key: string]: string | number | boolean | undefined
    
    init?: boolean
    add?: string
    update?: string | number
    remove?: string | number
    migrate?: string | number
    project?: string
}

export interface Settings
{
    projectName: string
    rootDir: string
    migrationDir: string
    modelDir: string
}

export function getTimestamp(): [Date, string]
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