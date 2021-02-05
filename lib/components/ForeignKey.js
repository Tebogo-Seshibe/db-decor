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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseState_1 = __importDefault(require("../DatabaseState"));
var ForeignKey = function (referenceTable) {
    return function (target, key) {
        var _a;
        var tableName = target.constructor.name;
        var table = DatabaseState_1.default.tables.get(tableName);
        if (!table) {
            table = {};
        }
        table.foreignKeys = __spread((_a = table.foreignKeys) !== null && _a !== void 0 ? _a : [], [
            {
                field: key,
                table: referenceTable
            }
        ]);
        DatabaseState_1.default.tables.set(target.constructor.name, table);
    };
};
exports.default = ForeignKey;
