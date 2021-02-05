"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Context = (function () {
    function Context(arg) {
        this._migrationId = -1;
        this._connectionString = '';
        this.migrationDirectory = '';
        this.contextDirectory = '';
        if (typeof arg === 'string') {
            this._connectionString = arg;
        }
        else {
            this._connectionString = "postgresql://" + arg.username + ":" + arg.password + "@" + arg.host + ":" + arg.port + "/" + arg.db + (arg.ssl ? '?sslmode=require' : '');
        }
        try {
            this._client = new pg_1.Client(this._connectionString);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    Context.prototype.migrate = function () {
    };
    return Context;
}());
exports.default = Context;
