import { BaseEntity, Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "bson";

@Entity()
export class CaseEntity extends BaseEntity {
	@ObjectIdColumn() private _id!: ObjectId;
	@Column() public guildId: string;

	@Column() public subject: any = "";
	@Column() public moderator: string = "";
	@Column() public reason: string = "none";
	@Column() public id: number = 0;
	@Column() public amount: number = 0;
	@Column() public type!: "mute" | "ban" | "purge" |  "kick" | "lockdown" | "slowmode" | "warn";

	public constructor(id: number, guildId: string) {
		super();

		this.id = id;
		this.guildId = guildId;
	}
}