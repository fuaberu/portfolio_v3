"use client";

import { useEffect } from "react";
import { registerAction } from "../../actions";
import { usePathname, useSearchParams } from "next/navigation";

export const AnalyticsHandler = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		registerAction({
			action: "page-load",
			description: pathname + searchParams.toString(),
		});
	}, [pathname, searchParams]);

	useEffect(() => {
		const initApp = async () => {
			// Initiate visits cookies
			await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/visits");
		};

		initApp();

		const handleWindowClose = (_: BeforeUnloadEvent) => {
			registerAction({
				action: "close-window",
			});
			return;
		};

		const handleError = (error: ErrorEvent) => {
			registerAction({
				action: "error",
				description: error.message,
			});
		};

		window.addEventListener("error", handleError);
		window.addEventListener("beforeunload", handleWindowClose);
		return () => {
			window.removeEventListener("beforeunload", handleWindowClose);
			window.removeEventListener("error", handleError);
		};
	}, []);

	return null;
};
