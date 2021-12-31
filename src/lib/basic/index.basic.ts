import { State } from '../util/DatabaseState'

export function Index(name?: string): PropertyDecorator
{
    return function (target: Object, key: string | symbol): void
    {
        const className = target.constructor.name
        const indexName = name
            ? name
            : key as string + "_idx"
        
        const tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }
        
        if (!tableInfo.table.indexes)
        {
            tableInfo.table.indexes = []
        }
        
        tableInfo.table.indexes.push(
        {
            field: key as string,
            name: indexName
        })
        State[className] = tableInfo
    }
}
