import "../util/DatabaseState"

export type NameCasing = 'pascal' | 'camel' | 'snake' | 'kebab'

export interface TableProperties
{
    textCasing?: NameCasing
}

export interface TableDetails
{
    name?: string
    primaryKey?: string
    foreignKeys?: {
        field: string,
        table: string
    }[],
    textCasing?: NameCasing
}

export function Table(): (constructor: Function) => void
export function Table(name: string): (constructor: Function) => void
export function Table(props: TableDetails): (constructor: Function) => void
export function Table(name: string, props: TableDetails): (constructor: Function) => void
export function Table(arg1?: string | TableDetails, arg2?: TableDetails): (constructor: Function) => void
{
    return function(constructor: Function)
    {
        const className = constructor.name
        const tableName = arg1 && typeof arg1 === 'string'
            ? arg1 
            : constructor.name
        
        let tableDetails: TableDetails | undefined = DatabaseState.tables.get(className)

        if (tableDetails && tableDetails.name === tableName)
        {
            throw `Table ${ tableName } already exists`
        }

        tableDetails = {
            name: tableName,
            textCasing: 'camel'
        }

        if (arg1 && typeof arg1 !== 'string')
        {
            tableDetails = {
                ...tableDetails,
                ...arg1
            }
        }
        else if (arg2)
        {
            tableDetails = {
                ...tableDetails,
                ...arg2
            }
        }

        DatabaseState.tables.set(constructor.name, tableDetails)
    }
}
