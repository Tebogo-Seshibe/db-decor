# db-decor

Simple library that allows you to manage database migrations using decorators.


## Installation
```node
npm install -g db-decor

```
## Usage
```
Usage: db-decor [options] [command]

Options:
  -h, --help            Display help for command

Commands:
  init                  Initialize the projects with and create the structure
  add <migration-name>  Creates a new migration
  remove                Removes all unused migrations
  update [options]      Update the database to the newest, or provided migration
    Options:
      -n, --name        Name of the migration
      -i, --index       Index of the migration
      -h, --help        Display help for command
  rollback [options]    Rollbacks the database to previous, or the provided migration
    Options:
      -n, --name        Name of the migration
      -i, --index       Index of the migration
      -h, --help        Display help for command
  help [command]        Display help for command
```

### Example
example.ts

```ts
import {
    Table,
    PrimaryKey,
    StringColumn,
    NumberColumn
} from 'db-decor'

@Table('students')
export class Student
{
    @PrimaryKey()
    @NumberColumn('id', { type: 'int' })
    Id!: number

    @StringColumn('id', { type: 'varchar' })
    Name!: string

    @NumberColumn('age', { type: 'int', min: 0 })
    Age!: number
    
    @StringColumn('id', { type: 'char' })
    Gender!: string

    @StringColumn('id', { type: 'float', min: 0, max: 4 })
    GPA!: number

    @StringColumn('id', { type: 'varchar' })
    Email!: number

    @StringColumn('student_number', { type: 'varchar' })
    StudentNumber!: string
}

@Table('courses')
export class Course
{
    @PrimaryKey()
    @NumberColumn('id', { type: 'int' })
    Id!: number

    @StringColumn('name', { type: 'varchar' })
    Name!: string

    @StringColumn('code', { type: 'varchar', length: 4 })
    Code!: string

    @StringColumn('department', { type: 'varchar' })
    Department!: string

    @StringColumn('description', { type: 'text', nullable: true })
    Description!: string
}

@Table('course_entries')
export class CourseEntry
{
    @PrimaryKey()
    @NumberColumn('id', { type: 'int' })
    Id!: number

    @ForeignKey('courses')
    @StringColumn('student_id', { type: 'int' })
    CourseId!: string

    @ForeignKey('students')
    @StringColumn('student_id', { type: 'int' })
    StudentId!: string
}
```
