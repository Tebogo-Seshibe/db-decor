import { Client } from "pg"

export const Table = (tableName: string): TableBuilder => new TableBuilder(tableName)
export class TableBuilder
{
    private _schemaName: string
    private _tableName: string
    private _columns: string[]
    private _indexes: string[]

    constructor(tableName: string, schemaName: string = 'default')
    {
        this._schemaName = schemaName
        this._tableName = tableName
        this._columns = []
        this._indexes = []
    }

    public schema = (schemaName: string): TableBuilder =>
    {
        this._schemaName = schemaName
        return this
    }

    public columns = (...columns: ColumnBuilder[]): TableBuilder =>
    {
        this._columns.concat(columns.map(column => column.build()))
        return this
    }

    public indexes = (...indexes: string[]): TableBuilder =>
    {
        this._indexes.concat(indexes)
        return this
    }

    public build = (): string => 
    {
        return [
            `CREATE TABLE "${this._schemaName}"."${ this._tableName }" (`,
            this._columns.map(col => '    ' + col).join(',\n'),
            this._indexes.map(col => [
                '   ',
                'CREATE INDEX',
                `"idx_${ col }"`,
                'ON',
                `"${ col }"`
            ].join(' ')),
            ')'
        ].join('\n')
    }
}

export const Column = (columnName: string): ColumnBuilder => new ColumnBuilder(columnName)
export class ColumnBuilder
{
    private _columnName: string
    private _boolean: boolean = false
    private _integer: boolean = false
    private _float: boolean = false
    private _decimal: boolean = false
    private _char: boolean = false
    private _varchar: boolean = false
    private _text: boolean = false
    private _date: boolean = false
    private _primaryKey: boolean = false
    private _nullable: boolean = false

    public constructor(columnName: string)
    {
        this._columnName = columnName
    }
    
    public boolean = (): ColumnBuilder =>
    {
        this._boolean = true
        return this
    }
    
    public integer = (): ColumnBuilder =>
    {
        this._integer = true
        return this
    }
    
    public float = (): ColumnBuilder =>
    {
        this._float = true
        return this
    }
    
    public decimal = (): ColumnBuilder =>
    {
        this._decimal = true
        return this
    }
    
    public char = (): ColumnBuilder =>
    {
        this._char = true
        return this
    }
    
    public varchar = (): ColumnBuilder =>
    {
        this._varchar = true
        return this
    }
    
    public text = (): ColumnBuilder =>
    {
        this._text = true
        return this
    }
    
    public date = (): ColumnBuilder =>
    {
        this._date = true
        return this
    }
    
    public primaryKey = (): ColumnBuilder =>
    {
        this._primaryKey = true
        return this
    }
    
    public nullable = (): ColumnBuilder =>
    {
        this._nullable = true
        return this
    }

    public build(): string
    {
        return [
            this._columnName,
            this._boolean ? 'boolean' : '',
            this._integer ? 'integer' : '',
            this._float ? 'float' : '',
            this._decimal ? 'decimal' : '',
            this._char ? 'char' : '',
            this._varchar ? 'varchar' : '',
            this._text ? 'text' : '',
            this._date ? 'date' : '',
            this._primaryKey ? 'primary key' : '',
            this._nullable ? 'null' : 'not null',
        ].filter(x => x.length > 0).join(' ')
    }
    
    valueOf(): string
    {
        return this.build()
    }
}

class MigrationGenerator
{
    private dbClient?: Client
    public finalQuery: string = ''

    constructor()
    {
        // dotEnv.config()
        // this.dbClient = new Client(
        // {
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     host: process.env.DB_HOST,
        //     database: process.env.DB_NAME,
        //     port: Number(process.env.DB_PORT ?? '5432'),
        //     ssl: {
        //         rejectUnauthorized: false
        //     }
        // })
    }

    public createTable = (tableName: string, ...columns: string[]): MigrationGenerator => {
        this.finalQuery += [
            `CREATE TABLE "${tableName}" (`,
                ...columns.map((x,i,a) => '\t' + x + (i < a.length - 1 && ',' || '')),
            ');'
        ].join('\n')
        return this
    }
    
    public dropTable = (tableName: string): MigrationGenerator => {
        return this
    }
    
    public addColumn = (columnName: string): MigrationGenerator => {
        return this
    }
    
    public removeColumn = (columnName: string): MigrationGenerator => {
        return this
    }
    
}

const table = Table('members')
    .columns(
        Column('id').integer().primaryKey(),
        Column('name').varchar().nullable(),
        Column('surname').varchar()
    )
    .indexes('name')
    .build()
    
export default MigrationGenerator
