import MigrationBuilder from "./MigrationBuilder"

interface Migration
{
    up(migrationBuilder: MigrationBuilder): void
    
    down(migrationBuilder: MigrationBuilder): void
}

export default Migration
