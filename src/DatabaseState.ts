import { ColumnDetails } from "./lib/columns/Column"
import { TableDetails } from "./lib/components/Table"

const DatabaseState =
{
    tables: new Map<string, TableDetails>(),
    columns: new Map<string, ColumnDetails[]>()
}

export default DatabaseState
