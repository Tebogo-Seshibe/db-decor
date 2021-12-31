import { State } from '../util/DatabaseState'

export type Class<T> = { new (args: any): T }

export function ForeignKey(referenceTable: Class<any>): PropertyDecorator
export function ForeignKey(referenceTable: string): PropertyDecorator
export function ForeignKey(referenceTable: string | Class<any>): PropertyDecorator
{
    return function (target: Object, key: string | symbol): void
    {
        const className = target.constructor.name
        const fieldName = key as string
        
        const tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }

        const foreignKeys = tableInfo.table.foreignKeys ?? []
        if (foreignKeys.findIndex(x => x.field === fieldName) !== -1)
        {
            throw new Error(`Duplicate foreign key found.\nClass: ${className}\nField: ${fieldName}\nReference Table: ${referenceTable}`)
        }

        foreignKeys.push(
        {
            field: fieldName,
            table: typeof referenceTable === 'string'
                ? referenceTable
                : referenceTable.name
        })

        tableInfo.table.foreignKeys = foreignKeys
        State[className] = tableInfo
    }
}
