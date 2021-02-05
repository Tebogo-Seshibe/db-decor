import { Client } from "pg"

interface IContext
{
    host: string
    db: string
    port: number
    ssl: boolean
    username: string
    password: string
}

class Context
{
    private _migrationId: number = -1
    private _connectionString: string = ''
    private _client: Client

    private migrationDirectory: string = ''
    private contextDirectory: string = ''

    constructor(connectionString: string)
    constructor(connectionDetails: IContext)
    constructor(arg: string | IContext)
    {
        if (typeof arg === 'string')
        {
            this._connectionString = arg
        }
        else
        {
            this._connectionString = `postgresql://${arg.username}:${arg.password}@${arg.host}:${arg.port}/${arg.db}${arg.ssl ? '?sslmode=require' : ''}`
        }

        try
        {
            this._client = new Client(this._connectionString)
        }
        catch (e)
        {
            console.error(e)
            throw e
        }
    }

    public migrate(): void {

    }
}

export default Context
