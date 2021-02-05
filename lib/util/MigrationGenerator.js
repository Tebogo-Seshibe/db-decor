"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.Table = void 0;
var Table = function (tableName) { return new TableBuilder(tableName); };
exports.Table = Table;
var TableBuilder = (function () {
    function TableBuilder(tableName) {
        var _this = this;
        this.with = function (column) {
            _this._columns.push(column.build());
            return _this;
        };
        this.index = function (columnName) {
            _this._indexes.push(columnName);
            return _this;
        };
        this.build = function () {
            return [
                "CREATE TABLE \"" + _this._tableName + "\" (",
                _this._columns.map(function (col) { return '    ' + col; }).join(',\n'),
                _this._indexes.map(function (col) { return [
                    '   ',
                    'CREATE INDEX',
                    "\"idx_" + col + "\"",
                    'ON',
                    "\"" + col + "\""
                ].join(' '); }),
                ')'
            ].join('\n');
        };
        this._tableName = tableName;
        this._columns = [];
        this._indexes = [];
    }
    return TableBuilder;
}());
var Column = function (columnName) { return new ColumnBuilder(columnName); };
exports.Column = Column;
var ColumnBuilder = (function () {
    function ColumnBuilder(columnName) {
        var _this = this;
        this._boolean = false;
        this._integer = false;
        this._float = false;
        this._decimal = false;
        this._char = false;
        this._varchar = false;
        this._text = false;
        this._date = false;
        this._primaryKey = false;
        this._nullable = false;
        this.boolean = function () {
            _this._boolean = true;
            return _this;
        };
        this.integer = function () {
            _this._integer = true;
            return _this;
        };
        this.float = function () {
            _this._float = true;
            return _this;
        };
        this.decimal = function () {
            _this._decimal = true;
            return _this;
        };
        this.char = function () {
            _this._char = true;
            return _this;
        };
        this.varchar = function () {
            _this._varchar = true;
            return _this;
        };
        this.text = function () {
            _this._text = true;
            return _this;
        };
        this.date = function () {
            _this._date = true;
            return _this;
        };
        this.primaryKey = function () {
            _this._primaryKey = true;
            return _this;
        };
        this.nullable = function () {
            _this._nullable = true;
            return _this;
        };
        this._columnName = columnName;
    }
    ColumnBuilder.prototype.build = function () {
        return [
            this._columnName,
            this._boolean ? 'boolean' : '',
            this._integer ? 'integer' : '',
            this._float ? 'float' : '',
            this._decimal ? 'decimal' : '',
            this._char ? 'char' : '',
            this._varchar ? 'varchar' : '',
            this._text ? 'text' : '',
            this._date ? 'date' : '',
            this._primaryKey ? 'primary key' : '',
            this._nullable ? 'null' : 'not null',
        ].filter(function (x) { return x.length > 0; }).join(' ');
    };
    ColumnBuilder.prototype.valueOf = function () {
        return this.build();
    };
    return ColumnBuilder;
}());
var MigrationGenerator = (function () {
    function MigrationGenerator() {
        var _this = this;
        this.finalQuery = '';
        this.createTable = function (tableName) {
            var columns = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                columns[_i - 1] = arguments[_i];
            }
            _this.finalQuery += __spread([
                "CREATE TABLE \"" + tableName + "\" ("
            ], columns.map(function (x, i, a) { return '\t' + x + (i < a.length - 1 && ',' || ''); }), [
                ');'
            ]).join('\n');
            return _this;
        };
        this.dropTable = function (tableName) {
            return _this;
        };
        this.addColumn = function (columnName) {
            return _this;
        };
        this.removeColumn = function (columnName) {
            return _this;
        };
    }
    return MigrationGenerator;
}());
var table = exports.Table('members')
    .with(exports.Column('id').integer().primaryKey())
    .with(exports.Column('name').varchar().nullable())
    .with(exports.Column('surname').varchar())
    .index('name')
    .build();
console.log(table);
exports.default = MigrationGenerator;
