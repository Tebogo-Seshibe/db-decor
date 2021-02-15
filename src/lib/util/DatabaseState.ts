import { ColumnDetails } from "../columns/Column"
import { TableDetails } from "../components/Table"

export type State =
{
    tables:  Map<string, TableDetails>,
    columns: Map<string, ColumnDetails[]>
}

declare global
{
    export let DatabaseState: State
}

DatabaseState = {
    tables: DatabaseState?.tables ?? new Map<string, TableDetails>(),
    columns: DatabaseState?.columns ??  new Map<string, ColumnDetails[]>(),
}
