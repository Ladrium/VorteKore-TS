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
let GuildEntity = class GuildEntity extends typeorm_1.BaseEntity {
    constructor(guildId) {
        super();
        this.cases = 0;
        this.levelUpMsg = true;
        this.prefixes = ["!"];
        this.djRole = "";
        this.muteRole = "";
        this.welcomeMessage = "Welcome **{{mention}}** to **{{server}}**!\n\n**{{server}}** now has {{memberCount}} members!";
        this.farewellMessage = "Goodbye **{{mention}}**, **{{server}}** says farewell!\n\n**{{server}}** now has {{memberCount}} members!";
        this.autoRoles = [];
        this.embedColor = "#4b62fa";
        this.starboardChannel = "";
        this.starboardEmoji = "⭐";
        this.starboardThreshold = 2;
        this.logs = {
            dltmsg: false,
            edtmsg: false,
            ban: true,
            kick: true,
            mute: true,
            warn: true,
            lockdown: true,
            slowmode: false,
            rladd: false,
            rlrem: false,
            channel: ""
        };
        this.guildId = guildId;
    }
    getCase() {
        return this.cases = this.cases + 1;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], GuildEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "guildId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GuildEntity.prototype, "cases", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], GuildEntity.prototype, "levelUpMsg", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], GuildEntity.prototype, "prefixes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "djRole", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "muteRole", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "welcomeMessage", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "farewellMessage", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], GuildEntity.prototype, "autoRoles", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "embedColor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "starboardChannel", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "starboardEmoji", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GuildEntity.prototype, "starboardThreshold", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], GuildEntity.prototype, "logs", void 0);
GuildEntity = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String])
], GuildEntity);
exports.GuildEntity = GuildEntity;
