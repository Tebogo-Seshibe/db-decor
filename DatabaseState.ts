import { ColumnDetails } from "./columns/Column"
import { TableDetails } from "./components/Table"

const DatabaseState =
{
    tables: new Map<string, TableDetails>(),
    columns: new Map<string, ColumnDetails[]>()
}

export default DatabaseState
