import { Column } from './column'
import { FloatingPointColumnProperties, IntegerColumnProperties, NumberColumnProperties } from './columnType'

export function Number(): PropertyDecorator
export function Number(name: string): PropertyDecorator
export function Number(props: IntegerColumnProperties): PropertyDecorator
export function Number(props: FloatingPointColumnProperties): PropertyDecorator
export function Number(name: string, props?: IntegerColumnProperties): PropertyDecorator
export function Number(name: string, props?: FloatingPointColumnProperties): PropertyDecorator
export function Number(arg1?: string | IntegerColumnProperties | FloatingPointColumnProperties, arg2?: IntegerColumnProperties | FloatingPointColumnProperties): PropertyDecorator
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

    return Column('number', properties, columnName)
}
