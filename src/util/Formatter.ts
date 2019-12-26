import Logger, { DefaultFormatter, LogMeta, LogLevelColor, LogLevel } from "@ayana/logger"
import { Color } from "@ayana/logger/build/util";
import fecha from "fecha";

export class VorteFormatter extends DefaultFormatter {
	public colored = new Color()
	public get timestamp() {
		return this.colored.dim(this.colored.gray(fecha.format(Date.now(), "hh:mm MM/DD/YYYY")));
	}

	public formatMessage(meta: LogMeta, message: string): string {
		const topic = this.colored.yellow(meta.extra!.topic !== undefined ? `(${meta.extra!.topic})` : `(VorteKore)`);
		const level = this.colored.get((LogLevelColor as any)[meta.level], meta.level.padEnd(6));
		const loc = `[${this.colored.magenta(`\u001b[1m${meta.origin.packageName}:`)}${this.colored.blue(`${meta.origin.packagePath}${meta.origin.name}`)}${meta.uniqueMarker 
			? `/${this.colored.gray(`${meta.uniqueMarker}`)}` 
			: ""}\u001b[22m]`
		return `${this.timestamp} ${topic} ${level}${loc}: ${message}`;
	}
}

Logger.getDefaultTransport().setLevel(LogLevel.TRACE);
Logger.setFormatter(new VorteFormatter());