import { VorteClient } from "../structures";
import { Request, Response } from "express-serve-static-core";
import { join } from "path";

const express = require("express");
const app = express();

export function startServer(bot: VorteClient) {
    app.use(express.static(join(process.cwd(), "views")));
    app.set("views", join(process.cwd(), "views"))
    app.set("view engine", "ejs");

    app.get("/", (req: Request, res: Response) => {
        res.render("public");
    });

    app.get("/commands/:command", (req: Request, res: Response) => {
        const commands = bot.commands.filter((x) => x.category.toLowerCase() === req.params.command);
        res.render("public/commands", { command: req.params.command, commands });
    });

    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });
};