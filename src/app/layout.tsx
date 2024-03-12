import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/utils/cn";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { Theme } from "@/types";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const themeCookie = cookies().get("theme");
	// current theme from cookies
	const theme = themeCookie
		? themeCookie.value === "dark"
			? Theme.dark
			: Theme.light
		: Theme.dark;

	return (
		<html lang="en" className={cn("relative", theme)}>
			<body
				className={cn(
					fontSans.variable,
					"flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
				)}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
