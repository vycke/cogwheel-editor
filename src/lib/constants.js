export const defaultStore = `{
	init: "visible",
	states: {
		visible: {
			TOGGLE: {
				target: "invisible"
			},
		},
		invisible: {
			TOGGLE: {
				target: "visible"
			},
		}
	}
}`;
