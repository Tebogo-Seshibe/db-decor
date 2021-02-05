"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var DatabaseState_1 = __importDefault(require("../DatabaseState"));
function Table(name) {
    return function (constructor) {
        var tableName = name !== null && name !== void 0 ? name : constructor.name;
        var table = DatabaseState_1.default.tables.get(constructor.name);
        if (table && table.name === tableName) {
            throw "Table " + tableName + " already exists";
        }
        if (!table) {
            table = {};
        }
        table.name = tableName;
        DatabaseState_1.default.tables.set(constructor.name, table);
    };
}
exports.default = Table;
