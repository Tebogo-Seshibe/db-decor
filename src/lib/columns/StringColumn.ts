import { ColumnDecorator, ColumnProperties } from "../util/DatabaseState"
import { Column } from "./Column"

export interface StringColumnProperties extends ColumnProperties
{
    type?: 'char' | 'varchar' | 'text'
    length?: number
}

export function StringColumn(): ColumnDecorator
export function StringColumn(name: string): ColumnDecorator
export function StringColumn(props: StringColumnProperties): ColumnDecorator
export function StringColumn(name: string, props?: StringColumnProperties): ColumnDecorator
export function StringColumn(arg1?: string | StringColumnProperties, arg2?: StringColumnProperties): ColumnDecorator
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
