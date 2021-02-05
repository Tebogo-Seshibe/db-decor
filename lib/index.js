"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForeignKey = exports.PrimaryKey = exports.StringColumn = exports.NumberColumn = exports.DateColumn = exports.Table = void 0;
var PrimaryKey_1 = __importDefault(require("./components/PrimaryKey"));
exports.PrimaryKey = PrimaryKey_1.default;
var ForeignKey_1 = __importDefault(require("./components/ForeignKey"));
exports.ForeignKey = ForeignKey_1.default;
var DateColumn_1 = __importDefault(require("./columns/DateColumn"));
exports.DateColumn = DateColumn_1.default;
var NumberColumn_1 = __importDefault(require("./columns/NumberColumn"));
exports.NumberColumn = NumberColumn_1.default;
var StringColumn_1 = __importDefault(require("./columns/StringColumn"));
exports.StringColumn = StringColumn_1.default;
var Table_1 = __importDefault(require("./components/Table"));
exports.Table = Table_1.default;
