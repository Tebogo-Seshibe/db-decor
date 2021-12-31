# db-decor

Simple library that allows you to manage database migrations using decorators.

## Installation

```node
npm install -g db-decor
```

## Usage

```node
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

Courses.ts

```ts
import {
  Index,
  Number,
  PrimaryKey,
  String,
  Table
} from "db-decor"

@Table('courses')
export class Course
{
  @PrimaryKey()
  @Number('id', { type: 'int' })
  Id!: number

  @Index('courses_name_idx')
  @String('name', { type: 'varchar' })
  Name!: string

  @Index('courses_code_idx')
  @String('code', { type: 'varchar', length: 4 })
  Code!: string

  @String('department', { type: 'varchar' })
  Department!: string

  @String('description', { type: 'text', nullable: true })
  Description!: string
}

```

Student.ts

```ts
import {
  Index,
  Number,
  PrimaryKey,
  String,
  Table
} from 'db-decor'

@Table('students')
export class Student
{
  @PrimaryKey()
  @Number('id', { type: 'int' })
  Id!: number

  @String('name', { type: 'varchar' })
  Name!: string

  @Number('age', { type: 'int', start: 0, step: 1 })
  Age!: number
  
  @String('gender', { type: 'char' })
  Gender!: string

  @Number('gpa', { type: 'float', precision: 2 })
  GPA!: number

  @Index('students_email_idx')
  @String('email', { type: 'varchar', length: 256 })
  Email!: number

  @Index('students_student_number_idx')
  @String('student_number', { type: 'varchar', length: 16 })
  StudentNumber!: string
}

```

StudentCourses.ts

```ts
import {
  Date,
  ForeignKey,
  Number,
  PrimaryKey,
  Table
} from 'db-decor'
import { Course } from './Course'
import { Student } from './Student'

@Table('student_courses')
export class StudentCourse
{
  @PrimaryKey()
  @Number('id', { type: 'int' })
  Id!: number  

  @Date('date_registered', { format: 'yyyy-mm-dd' })
  DateRegistered!: Date

  @ForeignKey('courses')
  @Number('student_id', { type: 'int' })
  CourseId!: string

  @ForeignKey('students')
  @Number('student_id', { type: 'int' })
  StudentId!: string
}

```

```ts
import { Date, ForeignKey, Number, PrimaryKey, Table } from "db-decor";
import { StudentCourse } from "./StudentCourse";

@Table('examination')
export class Examination
{
  @PrimaryKey()
  @Number('id', { type: 'serial' } )
  Id!: number

  @Date('date', { nullable: false, format: 'yyyy-mm-dd' })
  Date!: Date

  @Number('mark', { type: 'float', decimal: 3, precision: 2, nullable: false })
  Mark!: number

  @ForeignKey(StudentCourse)
  @Number('student_course_id', { type: 'int', nullable: false })
  StudentCourseId!: number
}
```

Result.sql

```sql
CREATE TABLE "students" (
  "id"              SERIAL          NOT NULL,
  "name"            VARCHAR (256)   NOT NULL,
  "age"             INT             NOT NULL,
  "gender"          CHAR            NOT NULL,
  "gpa"             NUMERIC (3, 2)  NULL,
  "email"           VARCHAR (256)   NOT NULL,
  "student_number"  VARCHAR (16)    NOT NULL,

  PRIMARY KEY ("id")
);
CREATE INDEX "students_email_idx"
  ON "students" ("email");
CREATE INDEX "students_student_number_idx"
  ON "students" ("student_number");

CREATE TABLE "courses" (
  "id"              SERIAL          NOT NULL,
  "name"            VARCHAR (256)   NOT NULL,
  "code"            VARCHAR (4)     NOT NULL,
  "department"      VARCHAR (256)   NOT NULL,
  "description"     VARCHAR (MAX)   NULL,
  
  PRIMARY KEY ("id") 
);
CREATE INDEX "courses_name_idx"
  ON "courses"("name");
CREATE INDEX "courses_name_idx"
  ON "courses"("code");

CREATE TABLE "student_courses" (
  "id"                SERIAL        NOT NULL,
  "date_registered"   TIMESTAMP     NOT NULL,
  "date_completed"    TIMESTAMP     NULL,
  "course_id"         INT           NOT NULL,
  "student_id"        INT           NOT NULL,

  PRIMARY KEY ("id"),
  FOREIGN KEY ("course_id")
    REFERENCES "courses" ("id"),
  FOREIGN KEY ("student_id")
    REFERENCES "students" ("id")
);

CREATE TABLE "examinations" (
  "id"                SERIAL          NOT NULL,
  "date"              TIMESTAMP       NOT NULL,
  "mark"              NUMERIC (5, 2)  NOT NULL,
  "student_course_id" INT             NOT NULL,

  FOREIGN KEY ("student_course_id")
    REFERENCES ("student_courses")
);

```
