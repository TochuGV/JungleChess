const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./helpers/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			neutral: colors.neutral,
		},
		extend: {
			spacing: {
				'84': '21rem',
			},
			colors: {
				primary: {
					100: "#DFF2D6",
					200: "#C0E6AE",
					300: "#A0D985",
					400: "#80CD5C",
					500: "#60C033",
					600: "#4D9A29",
					700: "#3A731F",
					800: "#274D15",
					900: "#13260A",
				},
				secondary: {
					100: "#D2EEF0",
					200: "#A6DEE1",
					300: "#00B6DF",
					400: "#4DBCC3",
					500: "#20ACB5",
					600: "#1A8990",
					700: "#13676C",
					800: "#0D4548",
					900: "#062224",
				},
				trapBackground: "#F49C00",
				endBackground: {
					0: "#45A0C1",
					1: "#C16544"
				}, 
				background: {
					100: "#E8E7E7",
					300: "#AEADAC",
					500: "#868583",
					700: "#5D5C59",
					800: "#494745",
					900: "#353330",
				},
				error: {
					100: "#FBCECE",
					300: "#F79C9C",
					500: "#F36B6B",
					700: "#EF3939",
					900: "#EB0808",
				},
				warning: {
					100: "#FDF3D0",
					300: "#FBE7A2",
					500: "#F9DB73",
					700: "#F7CF44",
					900: "#F4C315",
				},
				info: {
					100: "#E0F0F1",
					300: "#C1E0E2",
					500: "#A1D1D4",
					700: "#82C1C5",
					900: "#63B2B7",
				},
			},
		},
	},
	plugins: [],
};
