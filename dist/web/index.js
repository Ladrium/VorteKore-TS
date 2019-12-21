"use strict";
const express = require("express");
const app = express();
module.exports = function startServer(bot) {
    app.use(express.static(require("path").join(__dirname, "views")));
    app.set("views", __dirname + "/views");
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
};
