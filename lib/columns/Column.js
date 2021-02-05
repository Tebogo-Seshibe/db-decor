"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = void 0;
var DatabaseState_1 = __importDefault(require("../DatabaseState"));
function Column(columnType, properties, columnName) {
    return function (target, key) {
        var _a;
        var table = target.constructor.name;
        var columns = (_a = DatabaseState_1.default.columns.get(table)) !== null && _a !== void 0 ? _a : [];
        columnName = columnName !== null && columnName !== void 0 ? columnName : key;
        if (columns.length > 0 && columns.findIndex(function (x) { return x.columnName === columnName; }) !== -1) {
            throw "Duplicate column '" + columnName + "' found for class '" + table + "'";
        }
        var details = {
            field: key,
            columnName: columnName,
            columnType: columnType,
            properties: __assign({ nullable: false }, properties)
        };
        DatabaseState_1.default.columns.set(table, __spread(columns, [details]));
    };
}
exports.default = Column;
