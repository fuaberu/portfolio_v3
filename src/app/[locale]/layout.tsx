import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/utils/cn";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default async function LocaleLayout(props: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const params = await props.params;

	const { children } = props;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(params.locale as any)) {
		notFound();
	}
	setRequestLocale(params.locale);

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages({
		locale: params.locale,
	});

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body
				className={cn(
					fontSans.variable,
					"flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
				)}
			>
				<ThemeProvider attribute="class">
					<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
