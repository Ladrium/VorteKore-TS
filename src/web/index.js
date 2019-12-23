const express = require("express");
const app = express();
const session = require("express-session");
const Member = require("../models/member");
const fetch = require("node-fetch");
const { Permissions } = require("discord.js");
const { VorteGuild } = require("../structures/index");

module.exports = function startServer(bot) {
    app.use(express.static(require("path").join(__dirname, "/../../views")));
    app.use(session({
        secret: "ChaosIsCool",
        cookie: { maxAge: 86400000, secure: false },
        resave: false,
        saveUninitialized: true
    }));

    app.set("views", __dirname + "/../../views")
    app.set("view engine", "ejs");

    app.get("/", async (req, res) => {
        let user = req.session.user || false;
        res.render("public", { guilds: false, user, bot });
    });
    app.get("/guilds:id", (req, res) => {
        const guild = bot.guilds.get(req.params.id);
        if (!guild) res.redirect("/");
        const Guild = new VorteGuild();
    });
    app.get("/callback", async (req, res) => {
        if (!req.query.code) return res.redirect("/");
        let params = new URLSearchParams();
        params.append('client_id', "634766962378932224");
        params.append('client_secret', 'v6OKjC7jHMrzU8b5mddk__Y3ihs4zTr0');
        params.append('grant_type', 'authorization_code');
        params.append('code', req.query.code);
        params.append('redirect_uri', 'http://localhost:3000/callback');
        params.append('scope', 'identify guilds');

        const response = await fetch("https://discordapp.com/api/v6/oauth2/token", {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => res.json())
        if (response.error) return res.redirect("/");
        let access_token = response.access_token;
        req.session.access_token = access_token;
        const user = await fetch("https://discordapp.com/api/users/@me", {
            method: "GET",
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((res) => res.json());
        req.session.user = user;
        let guilds = await fetch("https://discordapp.com/api/users/@me/guilds", {
            method: "GET",
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((res) => res.json());

        guilds = guilds.filter((guild) => {
            const perms = new Permissions(guild.permissions);
            return perms.has("MANAGE_GUILD", { checkAdmin: true });
        });
        res.render("public", { guilds, user, bot });
    });
    app.get("/logout", (req, res) => {
        req.session.destroy();
        res.redirect("/");
    });
    app.get("/login", (req, res) => res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=634766962378932224&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20guilds"))
    app.get("/commands/:command", (req, res) => {
        let user = req.session.user || false;
        const commands = bot.commands.filter((x) => x.category.toLowerCase() === req.params.command);
        res.render("public/commands", { command: req.params.command, user, commands, bot });
    });
    app.get("/leaderboard/:page", async (req, res) => {
        let user = req.session.user || false;
        let page = req.params.page;
        let members = await Member.find();
        members.sort((a, b) => b.xp - a.xp);
        let toPush = [];
        page = Math.round(page);
        for (let i = page * 10 - 10; i < page * 10; i++) {
            try {
                let user = bot.users.get(members[i].id);
                let username = user ? user.username : "Unknown";
                toPush.push({ member: members[i], username })
            } catch (e) { }
        }
        res.render("public/leaderboard", { info: toPush, bot, user });
    });
    app.get("/leaderboard", async (req, res) => {
        let user = req.session.user || false;

        let members = await Member.find();
        members = members.sort((a, b) => b.xp - a.xp);
        members = members.slice(0, 10);
        let toPush = [];

        members.forEach((member) => {
            let user = bot.users.get(member.id);
            let username = user ? user.username : "Unknown";
            toPush.push({ member, username });
        });
        res.render("public/leaderboard", { info: toPush, bot, user });
    });
    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });

};