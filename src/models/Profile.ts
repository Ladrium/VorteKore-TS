import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class ProfileEntity extends BaseEntity {
	@ObjectIdColumn() private _id!: ObjectID;
	@Column({ unique: true }) public userId: string; 
	@Column() public guildId: string;
	@Column() public coins: number = 0;
	@Column() public xp: number = 0;
	@Column() public level: number = 1;
	@Column() public warns: number = 0;
	@Column() public bio: string = "I'm a cool VorteKore user!"

	public constructor(userId: string, guildId: string) {
		super();

		this.userId = userId;
		this.guildId = guildId;
	}

	public add(key: "coins" | "xp" | "level", amount: number) {
		this[key] = this[key] + amount;
		this.save().catch();
	}
}