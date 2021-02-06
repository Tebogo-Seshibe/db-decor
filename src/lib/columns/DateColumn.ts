import Column, { ColumnDecorator, ColumnProperties } from "./Column"

interface DateColumnProperties extends ColumnProperties
{
    format?: 'yyyy-mm-dd' | 'yyyy-dd-mm' | 'mm-dd-yyyy' | 'dd-mm-yyyy'
}

function DateColumn(): ColumnDecorator
function DateColumn(name?: string): ColumnDecorator
function DateColumn(props?: DateColumnProperties): ColumnDecorator
function DateColumn(name: string, props: DateColumnProperties): ColumnDecorator
function DateColumn(arg1?: string | DateColumnProperties, arg2?: DateColumnProperties): ColumnDecorator
{
    let columnName: string | undefined
    let properties: DateColumnProperties =
    {
        format: 'yyyy-mm-dd'
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

    return Column('date', properties, columnName)
}

export default DateColumn
