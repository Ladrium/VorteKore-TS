import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

interface GuildLogsMap {
	dltmsg: boolean;
	edtmsg: boolean;
	ban: boolean;
	kick: boolean;
	mute: boolean;
	warn: boolean;
	lockdown: boolean;
	slowmode: boolean;
	rlrem: boolean;
	rladd: boolean;
	channel: string;
	memberJoined?: string;
	memberLeave?: string;
}

@Entity()
export class GuildEntity extends BaseEntity {
	@ObjectIdColumn() private _id!: ObjectID;
	@Column() public guildId!: string;
	@Column() public cases: number = 0;
	@Column() public levelUpMsg: boolean = true;
	@Column() public prefixes: string[] = ["!"];
	@Column() public djRole: string = "";
	@Column() public muteRole: string = "";
	@Column() public welcomeMessage: string = "Welcome **{{mention}}** to **{{server}}**!\n\n**{{server}}** now has {{memberCount}} members!";
	@Column() public farewellMessage: string = "Goodbye **{{mention}}**, **{{server}}** says farewell!\n\n**{{server}}** now has {{memberCount}} members!"
	@Column() public autoRoles: string[] = [];
	@Column() public embedColor: string = "#4b62fa";
	@Column() public starboardChannel: string = "";
	@Column() public starboardEmoji: string = "⭐";
	@Column() public starboardThreshold: number = 2;
	@Column() public logs: GuildLogsMap = {
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
	}

	public constructor(guildId: string) {
		super();

		this.guildId = guildId;
	}

	public getCase(): number {
	 	return this.cases = this.cases + 1;
	}
}