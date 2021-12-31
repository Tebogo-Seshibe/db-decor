export default `import { Context } from "db-decor"

export class {{ contextName }} extends Context
{

    constructor()
    {
        super()
        // super('connection string')
        // super(
        // {
        //     host: 'host address',
        //     port: 12345,
        //     ssl: true,
        //     db: 'database name',
        //     username: 'admin',
        //     password: 'password1'
        // })
    }
}
`