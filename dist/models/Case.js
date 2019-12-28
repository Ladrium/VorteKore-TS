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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bson_1 = require("bson");
let CaseEntity = class CaseEntity extends typeorm_1.BaseEntity {
    constructor(id, guildId) {
        super();
        this.subject = "";
        this.moderator = "";
        this.reason = "none";
        this.id = 0;
        this.amount = 0;
        this.id = id;
        this.guildId = guildId;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", bson_1.ObjectId)
], CaseEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CaseEntity.prototype, "guildId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], CaseEntity.prototype, "subject", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CaseEntity.prototype, "moderator", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CaseEntity.prototype, "reason", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CaseEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CaseEntity.prototype, "type", void 0);
CaseEntity = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number, String])
], CaseEntity);
exports.CaseEntity = CaseEntity;
