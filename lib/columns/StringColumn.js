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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Column_1 = __importDefault(require("./Column"));
function StringColumn(arg1, arg2) {
    var columnName;
    var properties = {
        type: 'varchar',
        length: 127,
    };
    if (typeof arg1 === 'string') {
        columnName = arg1;
    }
    else if (arg1 !== undefined) {
        properties = __assign(__assign({}, properties), arg1);
    }
    if (arg2 !== undefined) {
        properties = __assign(__assign({}, properties), arg2);
    }
    return Column_1.default('string', properties, columnName);
}
exports.default = StringColumn;
