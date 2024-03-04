import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { AtSign, Home, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/app/_components/footer";
import { cookies } from "next/headers";
import { Theme } from "@/types";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Portfolio",
		default: "Portfolio",
	},
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
		"Kevin Alves Fabel's portfolio. I'm a software engineer who loves building beautiful, performant, and scalable web applications.",
	keywords: ["kevin alves fabel", "portfolio"],
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
		<html lang="en" className={theme}>
			<body
				className={cn(
					fontSans.variable,
					"flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
				)}
			>
				<header>
					<FloatingNav navItems={navItems} theme={theme} />
				</header>
				<main className="relative mx-auto w-full flex-1">{children}</main>
				<Footer theme={theme} />
				<Toaster />
			</body>
		</html>
	);
}

const navItems = [
	{
		name: "Home",
		link: "/",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "About",
		link: "/about",
		icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Contact",
		link: "/contact",
		icon: <AtSign className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
];
