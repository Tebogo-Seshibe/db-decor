import { IQueryTranslator, Select } from "./QueryTranslator"

export class Query
{
    constructor(
        public root?: QueryNode,
        public current?: QueryNode
    ) { this.current = this.root}
    
}

export abstract class QueryNode
{
    constructor(
        public schema: string,
        public table: string,
        public prev?: QueryNode,
        public next?: QueryNode,
    ) { }

    public abstract build(queryTranslator: IQueryTranslator): string
}

export class SelectQueryNode extends QueryNode
{
    constructor(
        schema: string,
        table: string,
        parentQuery?: QueryNode,
        childQuery?: QueryNode,
        public fields: Select[] = []
    ) { super(schema, table, parentQuery, childQuery) }
    
    public build(queryTranslator: IQueryTranslator): string
    {
        return queryTranslator.select(this.schema, this.table, ...this.fields)
    }
}

export class WhereQueryNode extends QueryNode
{
    constructor(
        schema: string,
        table: string,
        parentQuery: SelectQueryNode,
        public field: string,
        public condition: string,
        public comparitor: string
    ) { super(schema, table, parentQuery) }
    
    public build(queryTranslator: IQueryTranslator): string
    {
        return queryTranslator.where(this.schema, this.table)
    }
}

export class AndQueryNode extends QueryNode
{
    constructor(
        schema: string,
        table: string,
        parentQuery: WhereQueryNode,
        public field: string,
        public condition: string,
        public comparitor: string
    ) { super(schema, table, parentQuery) }
    
    public build(queryTranslator: IQueryTranslator): string
    {
        return queryTranslator.where(this.schema, this.table)
    }
}

export class OrQueryNode extends QueryNode
{
    constructor(
        schema: string,
        table: string,
        parentQuery: WhereQueryNode,
        public field: string,
        public condition: string,
        public comparitor: string
    ) { super(schema, table, parentQuery) }
    
    public build(queryTranslator: IQueryTranslator): string
    {
        return queryTranslator.where(this.schema, this.table)
    }
}