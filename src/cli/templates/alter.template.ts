export default `import { Migration, MigrationBuilder } from 'db-decor'

export class {{ migrationName }}_{{ migrationTimestamp }} implements Migration
{
    public up(migrationBuilder: MigrationBuilder): void
    {    
        migrationBuilder.alterTable('{{ up.table }}')
        
        {{ #up.columns }}
        migrationBuilder.updateColumn('{{ name }}', '{{ type }}', {})
        {{ /up.columns }}
        
        migrationBuilder
            .build()
    }

    public down(migrationBuilder: MigrationBuilder): void
    {
        {{ down }}
        migrationBuilder
            .build()
    }
}
`