import Column, { ColumnDecorator, ColumnProperties } from "./Column"

interface NumberColumnProperties extends ColumnProperties
{
}

interface IntegerColumnProperties extends NumberColumnProperties
{
    type?: 'small' | 'int' | 'serial'
    start?: number
    step?: number
}

interface FloatingPointColumnProperties extends NumberColumnProperties
{
    type?: 'float' | 'real' | 'float8' | 'numeric'
    precision?: number
    decimal?: number
    start?: number
    step?: number
}

function NumberColumn(): ColumnDecorator
function NumberColumn(name: string): ColumnDecorator
function NumberColumn(props: IntegerColumnProperties | FloatingPointColumnProperties): ColumnDecorator
function NumberColumn(name: string, props?: IntegerColumnProperties | FloatingPointColumnProperties): ColumnDecorator
function NumberColumn(arg1?: string | IntegerColumnProperties | FloatingPointColumnProperties, arg2?: IntegerColumnProperties | FloatingPointColumnProperties): ColumnDecorator
{
    let columnName: string | undefined
    let properties: NumberColumnProperties =
    {

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

    return Column('number', properties, columnName)
}

export default NumberColumn
