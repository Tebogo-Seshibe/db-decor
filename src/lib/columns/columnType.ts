export type ColumnType = 'number' | 'string' | 'date'
export type IntegerColumnType = 'small' | 'int' | 'serial'
export type FloatingPointType = 'float' | 'real' | 'float' | 'numeric'

export interface ColumnProperties
{
    nullable?: boolean
}

export interface NumberColumnProperties extends ColumnProperties
{
    type: string
}

export interface IntegerColumnProperties extends ColumnProperties
{
    type: IntegerColumnType
    start?: number
    step?: number
}

export interface FloatingPointColumnProperties extends ColumnProperties
{
    type: FloatingPointType
    precision?: number
    decimal?: number
}

export interface DateColumnProperties extends ColumnProperties
{
    format?: 'yyyy-mm-dd' | 'yyyy-dd-mm' | 'mm-dd-yyyy' | 'dd-mm-yyyy'
}
