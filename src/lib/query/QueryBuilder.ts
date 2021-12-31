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
        private type: Class<T>,
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
    
    public select<InKey extends keyof T>(field: InKey, ...more: InKey[]): QueryBuilder<Pick<T, InKey>>
    public select<InKey extends keyof T, OutKey extends string>(fields: Record<OutKey, InKey>): QueryBuilder<Record<OutKey, Pick<T, InKey>>>
    public select<InKey extends keyof T, OutKey extends string>(arg: InKey | Record<OutKey, InKey>, ...args: InKey[]): QueryBuilder<Pick<T, InKey> | Record<OutKey, Pick<T, InKey>>>
    {
        const fields = (typeof arg === 'string')
            ? [arg, ...args].map(name => ({ name } as Select))
            : Object.keys(arg).map(alias => ({ name: (arg as Record<OutKey, InKey>)[alias as OutKey], alias } as Select))
            
        if (!this.query.current)
        {
            this.query.current = new SelectQueryNode(
                this.schema(this.type),
                this.table(this.type),
                undefined,
                undefined,
                fields.map(({ name, alias }) => ({ name: this.column(this.type, name), alias }))
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
                fields.map(({ name, alias }) => ({ name: this.column(this.type, name), alias }))
            )
            this.query.current = this.query.current.next
        }

        console.log(this.query.current)
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
        return 0
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

    public async list<T extends any>(): Promise<T>
    {
        let node = this.query.root
        let compiledQuery = ''

        while (node)
        {
            compiledQuery += node.build(this.translator)
            node = node.next
        }

        if (this.client instanceof mssql.ConnectionPool)
        {
                this.client.connect()
                const { output } = await this.client.query(compiledQuery)
                return output as T
        }
        else
        {
            try
            {
                this.client.connect()
                const { rows } = await this.client.query(compiledQuery)
                return rows as T
            }
            catch(e)
            {
                console.log(e)   
            }
            finally
            {
                this.client.end()
            }

            return null as T
        }
    }
    //#endregion

    //#region Helpers
    private schema(_: Class<any>): string
    {
        return 'dbo'
    }

    private table(type: Class<any>): string
    {
        return State[type.name].table.name!
    }

    private column(type: Class<any>, field: string): string
    {
        console.log(field, State[type.name].columns.get(field)!.columnName)
        return State[type.name].columns.get(field)!.columnName
    }
    //#endregion
}
