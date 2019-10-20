"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var VorteClient = /** @class */ (function (_super) {
    __extends(VorteClient, _super);
    function VorteClient(options) {
        var _this = _super.call(this, options) || this;
        _this.commands = new discord_js_1.Collection();
        _this.aliases = new discord_js_1.Collection();
        _this.on("ready", function () {
            console.log(_this.user.username + " is ready to rumble!");
        });
        return _this;
    }
    return VorteClient;
}(discord_js_1.Client));
exports.VorteClient = VorteClient;
;
