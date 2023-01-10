module.exports = {
	description: "This is blog for Eric Carlisle, a UI, UX Engineer.",
	environment: process.env.ENVIRONMENT || "development",
	image: "/images/eric-carlisle-800x800.png",
	name: "Eric Carlisle : UI, UX Engineer",
	lang: "en",
	locale: "en_US",
	publisher: "Eric Carlisle",
	title: "Eric Carlisle : UI, UX Engineer",
	url: "https://www.ericcarlisle.com",
	hostname:
		process.env.ENVIRONMENT === "production"
			? "https://www.ericcarlisle.com"
			: "http://localhost:3000",
	favicon: {},
	social: {
		Facebook: {
			appId: "372474503176455",
			pageId: "102276088224812",
		},
		GitHub: {
			url: "https://github.com/ecarlisle",
		},
		Mastodon: {
			url: "https://fosstodon.org/@ericcarlisle",
		},
		LinkedIn: {
			url: "https://www.linkedin.com/in/ericcarlisle",
		},
		Instagram: {
			url: "https://www.instagram.com/ericcarlisle/",
		},
	},
};
