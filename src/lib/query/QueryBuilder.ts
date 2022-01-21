import mssql from 'mssql'
import pg from "pg"
import { State } from '..'
import { Class } from '../util/Context'
import { Query, SelectQueryNode } from './Query'
import { IQueryTranslator, Select } from './QueryTranslator'

export type Condition = '<' | '=' | '<>' | '>' | 'in' | 'not in' | 'like' 
export type AggregateType = 'array' | 'json'
export type OrderByType = 'asc' | 'desc'

export type TableColumnSelector<T> = Record<string, keyof T>
export type TableColumnResult<T> = {
    [K in keyof TableColumnSelector<T>]: T
}

export type ColumnSelector<T> = (table: T) => keyof T

export class QueryBuilder<T>
{
    protected query: Query = new Query()

    constructor(
        protected type: Class<T>,
        protected client: mssql.ConnectionPool | pg.Client,
        protected translator: IQueryTranslator
    ) { }

    //#region Query Generation
    public create(): QueryBuilder<T>
    {
        return this
    }

    public insert(): QueryBuilder<T>
    {
        return this
    }
    
    public select<U = T>(): QueryBuilder<T>
    public select<U = T>(...fields: (keyof U)[]): QueryBuilder<T>
    public select<OutKey extends string, U = T>(fields: any): QueryBuilder<T>
    public select<OutKey extends string, U = T>(arg?: (keyof U) | any, ...args: (keyof U)[]): QueryBuilder<T>
    {
        let fields: Select[] = []
        
        if (!arg)
        {
            fields = this.columns(this.type)
        }
        else if (typeof arg === 'string')
        {
            fields = [arg, ...args].map(name => this.column(this.type, name as string))            
        }
        else
        {
            const query = arg as any
            fields = Object.keys(arg).map(key => this.column(this.type, key as string, query[key as (keyof U)]))
        }

        if (!this.query.current)
        {
            this.query.current = new SelectQueryNode(
                this.schema(this.type),
                this.table(this.type),
                undefined,
                undefined,
                fields
            )
            this.query.root = this.query.current
        }
        else
        {
            if (!(this.query.current instanceof SelectQueryNode))
            {
                throw `whoops, don't know how to do that yet`
            }

            this.query.current.next = new SelectQueryNode(
                this.schema(this.type),
                this.table(this.type),
                this.query.current,
                undefined,
                fields
            )
            this.query.current = this.query.current.next
        }

        return this
    }

    public update(): QueryBuilder<T>
    {
        return this
    }

    public delete(): QueryBuilder<T>
    {
        return this
    }

    public where<K extends keyof T>(field: K, condition: '<' | '=' | '<>' | '>', target: any): QueryBuilder<T>
    public where<K extends keyof T>(field: K, condition: 'in' | 'not in', target: any[]): QueryBuilder<T>
    public where<K extends keyof T>(field: K, condition: 'like', target: string): QueryBuilder<T>
    public where<K extends keyof T>(field: K, condition: Condition, target: any): QueryBuilder<T>
    {
        this.query.current
        return this
    }
    
    public and<K extends keyof T>(field: K, condition: '<' | '=' | '<>' | '>', target: any): QueryBuilder<T>
    public and<K extends keyof T>(field: K, condition: 'in' | 'not in', target: any[]): QueryBuilder<T>
    public and<K extends keyof T>(field: K, condition: 'like', target: string): QueryBuilder<T>
    public and<K extends keyof T>(field: K, condition: Condition, target: any): QueryBuilder<T>
    {
        return this
    }
    
    public or<K extends keyof T>(field: K, condition: '<' | '=' | '<>' | '>', target: any): QueryBuilder<T>
    public or<K extends keyof T>(field: K, condition: 'in' | 'not in', target: any[]): QueryBuilder<T>
    public or<K extends keyof T>(field: K, condition: 'like', target: string): QueryBuilder<T>
    public or<K extends keyof T>(field: K, condition: Condition, target: any): QueryBuilder<T>
    {
        return this
    }

    public take(size: number): QueryBuilder<T>
    {
        if (!Number.isSafeInteger(size) || size < 0)
        {
            throw `${size} is not a valid size. Value must be a positive integer.`
        }

        // this._query.push(`LIMIT ${size}`)
        return this
    }

    public offset(size: number): QueryBuilder<T>
    {
        return this
    }
    
    public orderByAsc<Key extends keyof T>(field: Key): QueryBuilder<T>
    {
        return this
    }
    
    public orderByDesc<Key extends keyof T>(field: Key): QueryBuilder<T>
    {
        return this
    }

    public orderBy<K extends keyof T>(field: K): QueryBuilder<T>
    public orderBy<K extends keyof T>(field: K, direction: OrderByType): QueryBuilder<T>
    public orderBy<K extends keyof T>(fields: Record<K, OrderByType>): QueryBuilder<T>
    public orderBy<K extends keyof T>(arg1: K | Record<K, OrderByType>, arg2: OrderByType = 'asc'): QueryBuilder<T>
    {
        return this
    }

    public groupBy<K extends keyof T>(...fields: K[])
    {
        return this
    }

    public aggregate<K extends keyof T>(field: K, aggregateType: AggregateType)
    {
        return this
    }
    //#endregion

    //#region Query Execution
    public async count(): Promise<number>
    {
        let compiledQuery = this.buildQuery()

        if (this.client instanceof mssql.ConnectionPool)
        {
            try
            {
                this.client.connect()
                const { recordset } = await this.client.query(compiledQuery)
                return recordset.length
            }
            finally
            {
                this.client.close()
            }
        }
        else
        {
            try
            {
                this.client.connect()
                const { rowCount } = await this.client.query(compiledQuery)
                return rowCount
            }
            finally
            {
                this.client.end()
            }
        }
    }

    public async any(): Promise<boolean>
    {
        return false
    }

    public async first(): Promise<any>
    {

    }

    public async last(): Promise<any>
    {

    }

    public async list<T extends any>(): Promise<Array<T>>
    {
        let compiledQuery = this.buildQuery()

        if (this.client instanceof mssql.ConnectionPool)
        {
            try
            {
                this.client.connect()
                const { output } = await this.client.query(compiledQuery)
                return output as Array<T>
            }
            finally
            {
                this.client.close()
            }
        }
        else
        {
            try
            {
                this.client.connect()
                const { rows } = await this.client.query(compiledQuery)
                return rows as Array<T>
            }
            finally
            {
                this.client.end()
            }
        }
    }

    private buildQuery(): string
    {
        let node = this.query.root
        let compiledQuery: string = ''

        while (node)
        {
            compiledQuery += node.build(this.translator)
            node = node.next
        }

        return compiledQuery + ';'
    }

    //#endregion

    //#region Helpers
    private schema(type: Class<any>): string
    {
        return State[type.name].table.schema!
    }

    private table(type: Class<any>): string
    {
        return State[type.name].table.name!
    }

    private column(type: Class<any>, fieldName: string, alias?: string): Select
    {
        const { columnName, field } = State[type.name].columns.get(fieldName)!

        return { 
            name: columnName,
            alias: alias ?? field
        }
    }

    private columns(type: Class<any>): Select[]
    {
        const columns: Select[] = []
        
        State[type.name].columns.forEach(({ columnName, field }) =>
        {
            columns.push(
            { 
                name: columnName,
                alias: field
            })
        })
        
        return columns
    }
    //#endregion
}
