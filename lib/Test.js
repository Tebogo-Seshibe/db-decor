"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = exports.Subscriptions = exports.Project = exports.Member = exports.Account = void 0;
var _1 = require(".");
var DatabaseState_1 = __importDefault(require("./DatabaseState"));
var Member = (function () {
    function Member() {
    }
    __decorate([
        _1.PrimaryKey(),
        _1.NumberColumn('id', { type: 'int' }),
        __metadata("design:type", Number)
    ], Member.prototype, "Id", void 0);
    __decorate([
        _1.StringColumn('name'),
        __metadata("design:type", String)
    ], Member.prototype, "Name", void 0);
    __decorate([
        _1.StringColumn('name', { type: 'varchar', length: 128 }),
        __metadata("design:type", String)
    ], Member.prototype, "Surname", void 0);
    __decorate([
        _1.DateColumn('date_of_birth'),
        __metadata("design:type", Date)
    ], Member.prototype, "DateOfBirth", void 0);
    __decorate([
        _1.StringColumn('phone_number', { type: 'varchar', length: 128 }),
        __metadata("design:type", String)
    ], Member.prototype, "PhoneNumber", void 0);
    __decorate([
        _1.StringColumn('address', { type: 'varchar', length: 256 }),
        __metadata("design:type", String)
    ], Member.prototype, "Address", void 0);
    __decorate([
        _1.StringColumn('email', { type: 'varchar', length: 256 }),
        __metadata("design:type", String)
    ], Member.prototype, "Email", void 0);
    Member = __decorate([
        _1.Table('members')
    ], Member);
    return Member;
}());
exports.Member = Member;
var Account = (function () {
    function Account() {
    }
    __decorate([
        _1.PrimaryKey(),
        _1.NumberColumn('id', { type: 'int' }),
        __metadata("design:type", Number)
    ], Account.prototype, "Id", void 0);
    __decorate([
        _1.StringColumn('name'),
        __metadata("design:type", String)
    ], Account.prototype, "Name", void 0);
    __decorate([
        _1.NumberColumn('recurring', { type: 'int' }),
        __metadata("design:type", String)
    ], Account.prototype, "Surname", void 0);
    Account = __decorate([
        _1.Table('accounts')
    ], Account);
    return Account;
}());
exports.Account = Account;
var Project = (function () {
    function Project() {
    }
    __decorate([
        _1.PrimaryKey(),
        _1.NumberColumn('id'),
        __metadata("design:type", Number)
    ], Project.prototype, "Id", void 0);
    __decorate([
        _1.StringColumn('name'),
        __metadata("design:type", String)
    ], Project.prototype, "Name", void 0);
    __decorate([
        _1.StringColumn('description', { nullable: true }),
        __metadata("design:type", String)
    ], Project.prototype, "Description", void 0);
    __decorate([
        _1.NumberColumn('cost', { type: 'numeric' }),
        __metadata("design:type", String)
    ], Project.prototype, "Cost", void 0);
    __decorate([
        _1.ForeignKey('projects'),
        _1.NumberColumn('account_id', { nullable: true }),
        __metadata("design:type", String)
    ], Project.prototype, "AccountId", void 0);
    Project = __decorate([
        _1.Table('projects')
    ], Project);
    return Project;
}());
exports.Project = Project;
var Subscriptions = (function () {
    function Subscriptions() {
    }
    __decorate([
        _1.PrimaryKey(),
        _1.NumberColumn('id'),
        __metadata("design:type", Number)
    ], Subscriptions.prototype, "Id", void 0);
    __decorate([
        _1.ForeignKey('members'),
        _1.NumberColumn('member_id'),
        __metadata("design:type", Number)
    ], Subscriptions.prototype, "MemberId", void 0);
    __decorate([
        _1.ForeignKey('projects'),
        _1.NumberColumn('project_id'),
        __metadata("design:type", Number)
    ], Subscriptions.prototype, "ProjectId", void 0);
    Subscriptions = __decorate([
        _1.Table('subscriptions')
    ], Subscriptions);
    return Subscriptions;
}());
exports.Subscriptions = Subscriptions;
var Payments = (function () {
    function Payments() {
    }
    __decorate([
        _1.PrimaryKey(),
        _1.NumberColumn('id'),
        __metadata("design:type", Number)
    ], Payments.prototype, "Id", void 0);
    __decorate([
        _1.DateColumn('date', { format: 'yyyy-mm-dd' }),
        __metadata("design:type", Number)
    ], Payments.prototype, "Date", void 0);
    __decorate([
        _1.NumberColumn('amount', { type: 'numeric' }),
        __metadata("design:type", Number)
    ], Payments.prototype, "Amount", void 0);
    __decorate([
        _1.ForeignKey('subcriptions'),
        _1.NumberColumn('subscription_id', { type: 'int' }),
        __metadata("design:type", Number)
    ], Payments.prototype, "SubscriptionId", void 0);
    Payments = __decorate([
        _1.Table('payments')
    ], Payments);
    return Payments;
}());
exports.Payments = Payments;
var InitialMigration_20210127204017 = (function () {
    function InitialMigration_20210127204017() {
    }
    InitialMigration_20210127204017.prototype.up = function (gen) {
    };
    InitialMigration_20210127204017.prototype.down = function (gen) {
    };
    return InitialMigration_20210127204017;
}());
try {
    for (var _c = __values(DatabaseState_1.default.tables), _d = _c.next(); !_d.done; _d = _c.next()) {
        var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
        console.log("'" + key + "'", '=>', value);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
try {
    for (var _f = __values(DatabaseState_1.default.columns), _g = _f.next(); !_g.done; _g = _f.next()) {
        var _h = __read(_g.value, 2), key = _h[0], value = _h[1];
        console.log("'" + key + "'", '=>', value);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
    }
    finally { if (e_2) throw e_2.error; }
}
