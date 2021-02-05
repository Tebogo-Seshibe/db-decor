"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseState_1 = __importDefault(require("../DatabaseState"));
var PrimaryKey = function () {
    return function (target, key) {
        var tableName = target.constructor.name;
        var table = DatabaseState_1.default.tables.get(tableName);
        if (!table) {
            table = {};
        }
        table.primaryKey = key;
        DatabaseState_1.default.tables.set(target.constructor.name, table);
    };
};
exports.default = PrimaryKey;
