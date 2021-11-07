import { State, TableDetails, TableProperties } from '../util/DatabaseState'



export function Table(): (constructor: Function) => void
export function Table(name: string): (constructor: Function) => void
export function Table(arg1?: string): (constructor: Function) => void
{
    return function(constructor: Function)
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

        tableInfo.table = { name: tableName }
        State[className] = tableInfo
    }
}
