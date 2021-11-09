export default `import { Migration, MigrationBuilder } from 'db-decor'

export class Init implements Migration
{
    public up(migrationBuilder: MigrationBuilder): void
    {    
        migrationBuilder.createTable('{{ up.table }}')
        
        {{ #up.columns }}
        migrationBuilder.addColumn('{{ name }}', '{{ type }}', {})
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