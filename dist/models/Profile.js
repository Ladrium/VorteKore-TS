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
let ProfileEntity = class ProfileEntity extends typeorm_1.BaseEntity {
    constructor(userId, guildId) {
        super();
        this.coins = 0;
        this.xp = 0;
        this.level = 1;
        this.warns = 0;
        this.bio = "I'm a cool VorteKore user!";
        this.userId = userId;
        this.guildId = guildId;
    }
    add(key, amount) {
        this[key] = this[key] + amount;
        this.save().catch();
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], ProfileEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "guildId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "coins", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "xp", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "level", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "warns", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "bio", void 0);
ProfileEntity = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String])
], ProfileEntity);
exports.ProfileEntity = ProfileEntity;
