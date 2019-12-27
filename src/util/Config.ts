export abstract class Config {
	public static get(key: string, envDetermined: boolean = true) {
		const node_env = envDetermined ? process.env.NODE_ENV === "development" ? "_BETA" : "_PROD" : "";
		const env = process.env[`${key.toUpperCase()}${node_env}`];
		return env;
	}
}