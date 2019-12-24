export * from "./functions";

String.prototype.trunc = function(n: number, useWordBoundary: boolean) {
	if (this.length <= n) return this;
	let subString = this.substr(0, n - 1);
	return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
}

String.prototype.ignoreCase = function(value: string): boolean {
	return this.toLowerCase() === value.toLowerCase();
}


declare global {
	interface String {
		ignoreCase(value: string): boolean;
		trunc(n: number, useWordBoundary?: boolean): String;
	}
}

