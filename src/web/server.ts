import { MessageEmbed, Permissions, TextChannel } from "discord.js";
import express from "express";
import session from "express-session";
import fetch from "node-fetch";
import { VorteClient, VorteGuild } from "../lib";
import { member } from "../models/member";
import { json, urlencoded } from "body-parser";

export const app = express();

export function startServer(bot: VorteClient) {
	app.use(urlencoded({ extended: true }));
	app.use(express.static(require("path").join(process.cwd(), "views")));
	app.use(session({
		secret: "ChaosIsCool",
		cookie: { maxAge: 86400000, secure: false },
		resave: false,
		saveUninitialized: true
	}));

	app.set("views", __dirname + "/../../views")
	app.set("view engine", "ejs");

	addRoutes(bot);

	app.listen(3000, () => {
		console.log("Server listening on port 3000");
	});
};

function addRoutes(bot: VorteClient) {
	app.get("/", (req, res) => {
		let user = req.session!.user || false;
		res.render("public", { guilds: false, user, bot });
	});

	app.get("/guilds/:id", (req, res) => {
		const guild = bot.guilds.get(req.params.id);
		if (!guild) return res.redirect("/");
		const Guild = new VorteGuild(guild);
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
		req.session!.access_token = access_token;
		const user = await fetch("https://discordapp.com/api/users/@me", {
			method: "GET",
			headers: { Authorization: `Bearer ${access_token}` }
		}).then((res) => res.json());
		req.session!.user = user;
		let guilds: any[] = await fetch("https://discordapp.com/api/users/@me/guilds", {
			method: "GET",
			headers: { Authorization: `Bearer ${access_token}` }
		}).then((res) => res.json());

		guilds = guilds.filter((guild) => {
			const perms = new Permissions(guild.permissions);
			return perms.has("MANAGE_GUILD", true);
		});
		res.render("public", { guilds: guilds.map(g => ({ joined: bot.guilds.has(g.id), ...g })), user, bot, invite: await bot.generateInvite(8) });
	});

	app.get("/logout", (req, res) => {
		req.session!.destroy((err) => {
			if (err) return res.status(500).json({ message: "sorry, something broke" });
			res.redirect("/");
		});
	});

	app.get("/login", async (req, res) => res.redirect(await bot.generateInvite()));

	app.get("/commands/:command", (req, res) => {
		let user = req.session!.user || false;
		const commands = bot.commands.filter((x) => x.category.toLowerCase() === req.params.command);
		res.render("public/commands", { command: req.params.command, user, commands, bot });
	});

	app.get("/leaderboard/:page", async (req, res) => {
		let user = req.session!.user || false;
		let page = Number(req.params.page);
		let members = await member.find({});

		// @ts-ignore
		members.sort((a, b) => b["x["] - a["xp"]);
		let toPush = [];
		page = Math.round(Number(page));

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
		let user = req.session!.user || false;

		let members = await member.find();

		// @ts-ignore
		members = members.sort((a, b) => b.xp - a.xp);
		members = members.slice(0, 10);
		let toPush: { member: import("mongoose").Document; username: string; }[] = [];

		members.forEach((member) => {
			let user = bot.users.get(member.id);
			let username = user ? user.username : "Unknown";
			toPush.push({ member, username });
		});
		res.render("public/leaderboard", { info: toPush, bot, user });
	});

	app.post("/discordbotlist", async (req, res) => {
		if (req.headers.authorization !== process.env.DBL_WEBHOOK_AUTH) 
			return res.status(401).json({ message: "fuck off" }).end();

		if (req.body.type !== "upvote") return res.status(200).json({ message: "thanks!" });

		const user = await bot.users.fetch(req.body.user);
		const logs = <TextChannel> bot.channels.get("613347362705768465");
		logs.send(new MessageEmbed()
			.setColor("#4b62fa")
			.setAuthor(user.tag, user.displayAvatarURL())
			.setDescription(`Thanks ${user} for voting! You can vote again in 12 hours.\n*prizes coming in eco update.*`));
		return res.status(200).json({ message: "thanks!" });
	});
}