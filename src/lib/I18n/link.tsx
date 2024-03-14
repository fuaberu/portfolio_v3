"use client";

import NextLink from "next/link";
import { Locale, locales } from ".";
import { cn } from "@/utils/cn";
import { useLocale } from "./provider";

interface Props extends React.ComponentProps<typeof NextLink> {
	locale?: Locale;
}

const Link = ({ href, className, ...props }: Props) => {
	let { locale, setLocale } = useLocale();

	if (props.locale) {
		locale = props.locale;
	}

	if (locales.some((loc) => href.toString().startsWith(`/${loc}`))) {
		href = href.toString().split("/").toSpliced(1).join("/");
	}

	return (
		<NextLink
			href={`/${locale}${href}`}
			className={cn("hover:cursor-pointer", className)}
			onClick={() => setLocale(locale)}
			{...props}
		>
			{props.children}
		</NextLink>
	);
};

export default Link;
