import { Client } from "pg"
import { QueryBuilder } from "../.."

export interface IContext
{
    host: string
    db: string
    port: number
    ssl: boolean
    username: string
    password: string
}

export class Context
{
    private _migrationId: number = -1
    private _connectionString: string = ''
    private _client?: Client

    private migrationDirectory: string = ''
    private contextDirectory: string = ''

    constructor()
    constructor(connectionString: string)
    constructor(connectionDetails: IContext)
    constructor(arg?: string | IContext)
    {
        try
        {
            if (typeof arg === 'string')
            {
                this._connectionString = arg
            }
            else if(arg !== undefined)
            {
                this._connectionString = `postgresql://${arg.username}:${arg.password}@${arg.host}:${arg.port}/${arg.db}${arg.ssl ? '?sslmode=require' : ''}`
            }
            // this._client = new Client(this._connectionString)
        }
        catch (e)
        {
            // console.error(e)
            // throw e
        }
    }

    public query<T>(): QueryBuilder<T>
    {
        return new QueryBuilder<T>()
    }

    public migrate(): void
    public migrate(index: number): void
    public migrate(name: string): void
    public migrate(arg?: number | string): void
    {

    }
}
