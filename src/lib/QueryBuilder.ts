import { Client } from "pg"

export type Condition = '<' | '=' | '<>' | '>' | 'in' | 'not in' | 'like' 
export type AggregateType = 'array' | 'json'

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
    
    public select<K extends keyof T>(field: K): QueryBuilder<Record<K, any>>
    public select<K extends keyof T, Q extends string>(fields: Record<Q, K>): QueryBuilder<Record<Q, any>>
    public select<K extends keyof T, Q extends string>(args: K | Record<Q, K>): QueryBuilder<Record<Q, any>>
    {
        return new QueryBuilder<Record<string, K>>()
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

    public orderBy<K extends keyof T>(field: K): QueryBuilder<T>
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
