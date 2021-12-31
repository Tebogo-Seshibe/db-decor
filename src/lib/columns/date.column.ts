import { Column } from './column'
import { DateColumnProperties } from './columnType'

export function Date(): PropertyDecorator
export function Date(name: string): PropertyDecorator
export function Date(props: DateColumnProperties): PropertyDecorator
export function Date(name: string, props: DateColumnProperties): PropertyDecorator
export function Date(arg1?: string | DateColumnProperties, arg2?: DateColumnProperties): PropertyDecorator
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
    else if (arg1)
    {
        properties =
        {
            ...properties,
            ...arg1,
        }
    }

    if (arg2)
    {
        properties =
        {
            ...properties,
            ...arg2,
        }
    }

    return Column('date', properties, columnName)
}
