import DatabaseState from "../DatabaseState"

type ColumnType = 'number' | 'string' | 'date'
type ColumnDecorator = (target: Object, key: string | symbol)  => void

interface ColumnProperties
{
    nullable?: boolean
}

interface ColumnDetails
{
    field: string
    columnName: string
    columnType: ColumnType
    properties: ColumnProperties
}

function Column(columnType: ColumnType, properties: ColumnProperties, columnName?: string)
{
    return (target: Object, key: string | symbol) => {
        const table = target.constructor.name
        const columns = DatabaseState.columns.get(table) ?? []
        columnName = columnName ?? key as string

        if (columns.length > 0 && columns.findIndex(x => x.columnName === columnName) !== -1)
        {
            throw `Duplicate column '${ columnName }' found for class '${ table }'`
        }

        const details: ColumnDetails = {
            field: key as string,
            columnName,
            columnType,
            properties: {
                nullable: false,
                ...properties
            }
        }
        
        DatabaseState.columns.set(table, [...columns, details])
    }
}

export {
    Column as default,
    ColumnType,
    ColumnDecorator,
    ColumnProperties,
    ColumnDetails
}
