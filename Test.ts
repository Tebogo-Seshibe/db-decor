import MigrationGenerator from "util/MigrationGenerator"
import { DateColumn, ForeignKey, NumberColumn, PrimaryKey, StringColumn, Table } from "."
import DatabaseState from "./DatabaseState"

@Table('members')
class Member
{
    @PrimaryKey()
    @NumberColumn('id', { type: 'int' })
    Id!: number

    @StringColumn('name')
    Name!: string

    @StringColumn('name', { type: 'varchar', length: 128 })
    Surname!: string

    @DateColumn('date_of_birth')
    DateOfBirth!: Date

    @StringColumn('phone_number', { type: 'varchar', length: 128 })
    PhoneNumber!: string

    @StringColumn('address', { type: 'varchar', length: 256 })
    Address!: string

    @StringColumn('email', { type: 'varchar', length: 256 })
    Email!: string
}

@Table('accounts')
class Account
{
    @PrimaryKey()
    @NumberColumn('id', { type: 'int' })
    Id!: number

    @StringColumn('name')
    Name!: string

    @NumberColumn('recurring', { type: 'int' })
    Surname!: string
}

@Table('projects')
class Project
{
    @PrimaryKey()
    @NumberColumn('id')
    Id!: number

    @StringColumn('name')
    Name!: string

    @StringColumn('description', { nullable: true })
    Description!: string

    @NumberColumn('cost', { type: 'numeric' })
    Cost!: string

    @ForeignKey('projects')
    @NumberColumn('account_id', { nullable: true })
    AccountId!: string
}

@Table('subscriptions')
class Subscriptions
{
    @PrimaryKey()
    @NumberColumn('id')
    Id!: number
    
    @ForeignKey('members')
    @NumberColumn('member_id')
    MemberId!: number
    
    @ForeignKey('projects')
    @NumberColumn('project_id')
    ProjectId!: number
}

@Table('payments')
class Payments
{
    @PrimaryKey()
    @NumberColumn('id')
    Id!: number
    
    @DateColumn('date', { format: 'yyyy-mm-dd' })
    Date!: number
    
    @NumberColumn('amount', { type: 'numeric' })
    Amount!: number
    
    @ForeignKey('subcriptions')
    @NumberColumn('subscription_id', { type: 'int' })
    SubscriptionId!: number
}

export {
    Account,
    Member,
    Project,
    Subscriptions,
    Payments,
}

interface Migration
{
    up(gen: MigrationGenerator): void
    down(gen: MigrationGenerator): void
}

class InitialMigration_20210127204017 implements Migration
{
    public up(gen: MigrationGenerator): void
    {
        // gen.createTable(
        //     'members',
        //     new Column('id').primaryKey(),
        //     new Column('name').varchar(),
        //     new Column('surname').varchar(8),
        // )

        // console.log(gen.finalQuery)
    }

    public down(gen: MigrationGenerator): void
    {

    }
}

for (const [key, value] of DatabaseState.tables)
{
    console.log(`'${ key }'`, '=>', value)
}
for (const [key, value] of DatabaseState.columns)
{
    console.log(`'${ key }'`, '=>', value)
}

// new InitialMigration_20210127204017().up(new MigrationGenerator())
