import { ColumnDetails } from "./lib/columns/Column"
import { TableDetails } from "./lib/components/Table"

export const DatabaseState =
{
    tables: new Map<string, TableDetails>(),
    columns: new Map<string, ColumnDetails[]>()
}
