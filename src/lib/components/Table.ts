import { State, TableDetails } from '../util/DatabaseState'



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
        
        let tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }

        let tableDetails: TableDetails = {
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

        tableInfo.table = tableDetails
        State[className] = tableInfo
    }
}
