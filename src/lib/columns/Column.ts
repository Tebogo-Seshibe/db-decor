import { State, ColumnDetails, ColumnProperties, ColumnType } from "../util/DatabaseState"

export function Column(columnType: ColumnType, properties: ColumnProperties, columnName?: string)
{
    return function(target: Object, key: string | symbol)
    {        
        const className = target.constructor.name
        const fieldName = key as string
        
        let tableInfo = State[className] ?? { }
        if (!tableInfo.columns)
        {
            tableInfo.columns = { }
        }

        if (tableInfo.columns[fieldName])
        {
            throw `Duplicate column found: ${fieldName}`            
        }

        let columnDetails: ColumnDetails = {
            field: fieldName,
            columnName: columnName ?? fieldName,
            columnType: columnType,
            properties: properties
        }

        tableInfo.columns[fieldName] = columnDetails
        State[className] = tableInfo
    }
}
