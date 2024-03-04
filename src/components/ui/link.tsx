import Link from "next/link";
import React from "react";
import { BottomGradient } from "../bottom-gradient";
import { cn } from "@/utils/cn";

interface Props extends React.HTMLProps<HTMLAnchorElement> {
	href: string;
	children: React.ReactNode;
}

export const AppLink = ({ children, href, className, ...rest }: Props) => {
	return (
		<div className="group/btn relative w-fit py-1">
			<Link
				href={href}
				className={cn(
					"border-t border-transparent text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
					className,
				)}
				{...rest}
			>
				{children}
			</Link>
			<BottomGradient />
		</div>
	);
};
