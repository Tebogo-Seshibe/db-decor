import { Column, ColumnDecorator, ColumnProperties } from "./Column"

export interface NumberColumnProperties extends ColumnProperties
{
    type: string
}

export type IntegerColumnType = 'small' | 'int' | 'serial'
export interface IntegerColumnProperties extends ColumnProperties
{
    type: IntegerColumnType
    start?: number
    step?: number
}

export type FloatingPointType = 'float' | 'real' | 'float8' | 'numeric'
export interface FloatingPointColumnProperties extends ColumnProperties
{
    type: FloatingPointType
    precision?: number
    decimal?: number
}

export function NumberColumn(): ColumnDecorator
export function NumberColumn(name: string): ColumnDecorator
export function NumberColumn(props: IntegerColumnProperties): ColumnDecorator
export function NumberColumn(props: FloatingPointColumnProperties): ColumnDecorator
export function NumberColumn(name: string, props?: IntegerColumnProperties): ColumnDecorator
export function NumberColumn(name: string, props?: FloatingPointColumnProperties): ColumnDecorator
export function NumberColumn(arg1?: string | IntegerColumnProperties | FloatingPointColumnProperties, arg2?: IntegerColumnProperties | FloatingPointColumnProperties): ColumnDecorator
{
    let columnName: string | undefined
    let properties: NumberColumnProperties =
    {
        type: 'int',
        nullable: false
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
