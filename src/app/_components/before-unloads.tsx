"use client";

import { useEffect } from "react";
import { registerAction } from "../actions";
import { usePathname, useSearchParams } from "next/navigation";

export const BeforeUnloads = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		registerAction({
			action: "page-load",
			description: pathname + searchParams.toString(),
		});
	}, [pathname, searchParams]);

	useEffect(() => {
		const handleWindowClose = (_: BeforeUnloadEvent) => {
			registerAction({
				action: "close-window",
			});
			return;
		};

		window.addEventListener("beforeunload", handleWindowClose);
		return () => {
			window.removeEventListener("beforeunload", handleWindowClose);
		};
	}, []);

	return null;
};
