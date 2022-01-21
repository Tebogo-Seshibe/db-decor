import { ColumnDetails, State } from '../util/DatabaseState'
import { ColumnProperties, ColumnType } from './columnType'

export function ColumnField(columnType: ColumnType, properties: ColumnProperties, columnName?: string): ParameterDecorator
{
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number): void
    {
        const className = target.constructor.name
        const fieldName = propertyKey as string
        
        console.log(target)
        console.log(propertyKey)
        console.log(parameterIndex)
        const tableInfo = State[className] ?? { }
        if (!tableInfo.columns)
        {
            tableInfo.columns = new Map()
        }

        if (tableInfo.columns.has(fieldName))
        {
            throw new Error(`Duplicate column found\nClass name: ${className}\nField name: ${fieldName}`)
        }

        const columnDetails: ColumnDetails =
        {
            field: fieldName,
            columnName: columnName ?? fieldName,
            columnType: columnType,
            properties: properties
        }

        tableInfo.columns.set(fieldName, columnDetails)
        State[className] = tableInfo
    }
}

export function Column(columnType: ColumnType, properties: ColumnProperties, columnName?: string): PropertyDecorator
{
    return function (target: Object, key: string | symbol): void
    {        
        const className = target.constructor.name
        const fieldName = key as string
        
        const tableInfo = State[className] ?? { }
        if (!tableInfo.columns)
        {
            tableInfo.columns = new Map()
        }

        if (tableInfo.columns.has(fieldName))
        {
            throw new Error(`Duplicate column found\nClass name: ${className}\nField name: ${fieldName}`)
        }

        const columnDetails: ColumnDetails =
        {
            field: fieldName,
            columnName: columnName ?? fieldName,
            columnType: columnType,
            properties: properties
        }

        tableInfo.columns.set(fieldName, columnDetails)
        State[className] = tableInfo
    }
}
