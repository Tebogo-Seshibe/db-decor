import { ColumnProperties } from './columnType'
import { Column } from './column'

export interface StringColumnProperties extends ColumnProperties
{
    type: 'char' | 'varchar' | 'text'
    length?: number
}

export function String(): PropertyDecorator
export function String(name: string): PropertyDecorator
export function String(props: StringColumnProperties): PropertyDecorator
export function String(name: string, props?: StringColumnProperties): PropertyDecorator
export function String(arg1?: string | StringColumnProperties, arg2?: StringColumnProperties): PropertyDecorator
{
    let columnName: string | undefined
    let properties: StringColumnProperties =
    {
        type: 'varchar',
        length: 128,
    }
    
    if (typeof arg1 === 'string')
    {
        columnName = arg1
    }
    else if (arg1 !== undefined)
    {
        properties =
        {
            ...properties,
            ...arg1,
        }
    }

    if (arg2 !== undefined)
    {
        properties =
        {
            ...properties,
            ...arg2,
        }
    }

    return Column('string', properties, columnName)
}
