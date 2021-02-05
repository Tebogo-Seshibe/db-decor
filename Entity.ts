import { Client } from "pg"

type Condition = '<' | '=' | '<>' | '>' | 'in' | 'not in' | 'like' 
type AggregateType = 'array' | 'json'

class QueryBuilder<T>
{
    private _client: Client = new Client
    private _query: string[] = []

    public insert(): QueryBuilder<T>
    {
        return this
    }

    public select(): QueryBuilder<T>
    {
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

    public where(field: string, condition: '<' | '=' | '<>' | '>', target: any): QueryBuilder<T>
    public where(field: string, condition: 'in' | 'not in', target: any[]): QueryBuilder<T>
    public where(field: string, condition: 'like', target: string): QueryBuilder<T>
    public where(field: string, condition: Condition, target: any): QueryBuilder<T>
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

    public orderBy(field: string): QueryBuilder<T>
    {
        return this
    }

    public groupBy(field: string, ...fields: string[])
    {
        return this
    }

    public aggregate(field: string, aggregateType: AggregateType)
    {
        return this
    }

    public async get(): Promise<T>
    {
        const query = this._query.join(' ')
        const response = await this._client.query<T>(query)

        return response.rows[0]
    }
}

class Entity<T>
{
    public async add(entity: T): Promise<T>
    {
        return await new QueryBuilder<T>().where('id', '=', '0').get()
    }
    
    public async find(id: number): Promise<T>
    {
        return await new QueryBuilder<T>().where('id', '=', id).get()
    }

    public async update(entity: T): Promise<T>
    {
        return entity
    }

    public async remove(id: number): Promise<T | void>
    public async remove(entity: T): Promise<T | void>
    public async remove(arg: number | T): Promise<T | void>
    {

    }
}

export default Entity
