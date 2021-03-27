export default `import { Migration, MigrationBuilder } from 'db-decor'

export class Init implements Migration
{
    public up(migrationBuilder: MigrationBuilder): void
    {    
{ __migration-up__ }
        migrationBuilder
            .build()
    }

    public down(migrationBuilder: MigrationBuilder): void
    {
{ __migration-down__ }
        migrationBuilder
            .build()
    }
}
`