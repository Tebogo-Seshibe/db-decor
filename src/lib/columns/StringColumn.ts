import Column, { ColumnDecorator, ColumnProperties } from "./Column"

interface StringColumnProperties extends ColumnProperties
{
    type?: 'char' | 'varchar' | 'text'
    length?: number
}

function StringColumn(): ColumnDecorator
function StringColumn(name: string): ColumnDecorator
function StringColumn(props: StringColumnProperties): ColumnDecorator
function StringColumn(name: string, props?: StringColumnProperties): ColumnDecorator
function StringColumn(arg1?: string | StringColumnProperties, arg2?: StringColumnProperties): ColumnDecorator
{
    let columnName: string | undefined
    let properties: StringColumnProperties =
    {
        type: 'varchar',
        length: 127,
    }
    
    if (typeof arg1 === 'string')
    {
        columnName = arg1
    }
    else if (arg1 !== undefined)
    {
        properties = {
            ...properties,
            ...arg1,
        }
    }

    if (arg2 !== undefined)
    {
        properties = {
            ...properties,
            ...arg2,
        }
    }

    return Column('string', properties, columnName)
}

export default StringColumn
