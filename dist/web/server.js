"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const express = require("express");
const app = express();
function startServer(bot) {
    app.use(express.static(path_1.join(process.cwd(), "views")));
    app.set("views", path_1.join(process.cwd(), "views"));
    app.set("view engine", "ejs");
    app.get("/", (req, res) => {
        res.render("public");
    });
    app.get("/commands/:command", (req, res) => {
        const commands = bot.commands.filter((x) => x.category.toLowerCase() === req.params.command);
        res.render("public/commands", { command: req.params.command, commands });
    });
    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });
}
exports.startServer = startServer;
;
