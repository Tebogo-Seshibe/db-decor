import { MigrationBuilder } from "./MigrationBuilder"

export interface Migration
{
    up(migrationBuilder: MigrationBuilder): void
    
    down(migrationBuilder: MigrationBuilder): void
}
