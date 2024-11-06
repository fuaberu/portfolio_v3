import { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
	authors: {
		name: "Kevin Alves Fabel",
		url: "https://www.linkedin.com/in/kevin-fabel/",
	},
	icons: [
		{
			rel: "icon",
			type: "image/svg+xml",
			sizes: "*",
			url: "/logo.svg",
		},
	],
	description:
		"Kevin Alves Fabel's personal website. I'm a software engineer who loves building beautiful, performant, and scalable web applications.",
	keywords: ["kevin alves fabel", "personal website"],
};

export const viewport: Viewport = {
	themeColor: "#06b6d4",
	colorScheme: "dark light",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return children;
}
