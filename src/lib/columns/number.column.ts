import { Column, ColumnField } from './column'
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


export function NumberField(): ParameterDecorator
export function NumberField(name: string): ParameterDecorator
export function NumberField(props: IntegerColumnProperties): ParameterDecorator
export function NumberField(props: FloatingPointColumnProperties): ParameterDecorator
export function NumberField(name: string, props?: IntegerColumnProperties): ParameterDecorator
export function NumberField(name: string, props?: FloatingPointColumnProperties): ParameterDecorator
export function NumberField(arg1?: string | IntegerColumnProperties | FloatingPointColumnProperties, arg2?: IntegerColumnProperties | FloatingPointColumnProperties): ParameterDecorator
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

    return ColumnField('number', properties, columnName)
}
