import { FloatingNav } from "@/components/ui/floating-navbar";
import { AtSign, Home } from "lucide-react";
import Footer from "@/components/ui/footer";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const params = await props.params;

	const { locale } = params;

	const t = await getTranslations({ locale, namespace: "portfolio.metadata" });

	return {
		title: {
			template: t("template"),
			default: t("default"),
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const t = await getTranslations("links");

	const navItems = [
		{
			name: t("home"),
			link: "/",
			icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
		{
			name: t("contact"),
			link: "/contact",
			icon: <AtSign className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
	];

	return (
		<>
			<header>
				<FloatingNav navItems={navItems} />{" "}
			</header>
			<main className="relative mx-auto w-full flex-1">{children}</main>
			<Footer navItems={navItems} />
		</>
	);
}
