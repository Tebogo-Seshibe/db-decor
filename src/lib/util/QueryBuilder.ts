import { Client } from "pg"

export type Condition = '<' | '=' | '<>' | '>' | 'in' | 'not in' | 'like' 
export type AggregateType = 'array' | 'json'
export type OrderByType = 'asc' | 'desc'

export type TableColumnSelector<T> = Record<string, keyof T>
export type TableColumnResult<T> = {
    [K in keyof TableColumnSelector<T>]: T
}

export class QueryBuilder<T>
{
    private _client: Client = new Client
    private _query: string[] = []

    public create(): QueryBuilder<T>
    {
        return this
    }

    public insert(): QueryBuilder<T>
    {
        return this
    }
    
    public select<InKey extends keyof T>(field: InKey, ...more: InKey[]): QueryBuilder<Pick<T, InKey>>
    public select<InKey extends keyof T, OutKey extends string>(fields:Record<OutKey, InKey>): QueryBuilder<Record<OutKey, Pick<T, InKey>>>
    public select<InKey extends keyof T, OutKey extends string>(fields: InKey | Record<OutKey, InKey>, ...more: InKey[]): QueryBuilder<Pick<T, InKey> | Record<OutKey, Pick<T, InKey>>>
    {
        return new QueryBuilder
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
        return this
    }

    public take(size: number): QueryBuilder<T>
    {
        if (!Number.isSafeInteger(size) || size < 0)
        {
            throw `${size} is not a valid size. Value must be a positive integer.`
        }

        this._query.push(`LIMIT ${size}`)
        return this
    }

    public offset(size: number): QueryBuilder<T>
    {
        return this
    }
    
    public orderByAsc<Key extends keyof T>(field: Key): QueryBuilder<T>
    {
        return new QueryBuilder
    }
    
    public orderByDesc<Key extends keyof T>(field: Key): QueryBuilder<T>
    {
        return new QueryBuilder
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

    public async get(): Promise<T>
    {
        const query = this._query.join(' ')
        this._client.connect()
        const response = await this._client.query<T>(query)
        this._client.end()
        
        return response.rows[0]
    }
}
