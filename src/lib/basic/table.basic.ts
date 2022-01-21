import { State } from '../util/DatabaseState'

export function Table(): ClassDecorator
export function Table(name: string): ClassDecorator
export function Table(name: string, schema: string): ClassDecorator
export function Table(arg1?: string, arg2: string = 'dbo'): ClassDecorator
{
    return function (constructor: Function): void
    {
        const className = constructor.name
        const tableName = arg1 && typeof arg1 === 'string'
            ? arg1 
            : constructor.name
        
        const tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }

        tableInfo.table =
        {
            ...tableInfo.table, 
            name: tableName,
            schema: arg2
        }
        State[className] = tableInfo
    }
}
