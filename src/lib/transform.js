export function strToConfig(str = '', def) {
	try {
		return eval('(' + str + ')');
	} catch (e) {
		return def;
	}
}
