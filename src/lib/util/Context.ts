import mssql from 'mssql'
import pg from "pg"
import { PostgreSQLTranslator } from "../query/PostgreSQLTranslator"
import { IQueryTranslator } from '../query/QueryTranslator'
import { QueryBuilder } from "../query/QueryBuilder"
import { State } from './DatabaseState'

export interface IContext
{
    host: string
    db: string
    port: number
    ssl: boolean
    username: string
    password: string
}

export enum DatabaseType
{
    MSSQL,
    PGSQL
}

export type Class<T> = { new (...args: any[]): T }

export class Context
{
    private _migrationId: number = -1
    private _connectionString: string = ''

    private _queryTranslator?: IQueryTranslator
    private _mssql?: mssql.ConnectionPool
    private _pg?: pg.Client
    
    private migrationDirectory: string = ''
    private contextDirectory: string = ''

    constructor(
        private _databaseType: DatabaseType,
        connectionDetails: IContext
    ) {
            this.createClient(connectionDetails)
    }

    private async createClient(connectionDetails: IContext): Promise<void>
    {
        try
        {
            switch (this._databaseType)
            {
                case DatabaseType.MSSQL:
                    this._mssql = await mssql.connect(
                    {
                        server: connectionDetails.host,
                        database: connectionDetails.db,
                        user: connectionDetails.username,
                        password: connectionDetails.password
                    })
                    this._queryTranslator = new PostgreSQLTranslator()
                    break

                case DatabaseType.PGSQL:
                    this._pg = new pg.Client(
                    {
                        host: connectionDetails.host,
                        database: connectionDetails.db,
                        user: connectionDetails.username,
                        password: connectionDetails.password
                    })
                    this._queryTranslator = new PostgreSQLTranslator()
                    break
            }
        }
        catch (e)
        {
            console.error(e)
            throw e
        }
    }

    public async querys<T>(): Promise<any> //QueryBuilder<T>
    {
        try
        {
            switch (this._databaseType)
            {
                case DatabaseType.MSSQL:
                    break

                case DatabaseType.PGSQL:
                    this._pg!.connect()

                    const select = this._queryTranslator!.select('dbo', 'students', { name: 'name', alias: 'Name' })
                    const { rows } = await this._pg!.query(select)

                    this._pg!.end()
                    return rows
            }
        }
        catch (e)
        {
            console.log(e)   
        }
    }

    public migrate(): void
    public migrate(index: number): void
    public migrate(name: string): void
    public migrate(arg?: number | string): void
    {

    }

    public query<T>(type: Class<T>): QueryBuilder<T>
    {
        return new QueryBuilder<T>(type, this._pg!, this._queryTranslator!)
    }
}
