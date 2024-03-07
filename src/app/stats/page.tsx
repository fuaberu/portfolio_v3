import { db } from "@/lib/db";
import { StatsTable } from "./_components/stats-table";
import { addHours } from "date-fns";
import { LineStats } from "@/components/ui/line-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { PasswordPromptDialog } from "@/components/password-prompt";
import { Visit } from "@prisma/client";

const page = async () => {
	const loginCookies = cookies().get(process.env.STATS_PASSWORD_COOKIE_NAME!);
	const isLoggedIn = loginCookies?.value === process.env.STATS_PASSWORD_COOKIE_VALUE!;

	if (!isLoggedIn) {
		return <PasswordPromptDialog />;
	}

	const visits = await db.visit.findMany({
		select: {
			id: true,
			city: true,
			createdAt: true,
			actions: {
				select: { id: true, action: true, createdAt: true },
				orderBy: { createdAt: "desc" },
				take: 1,
			},
			messages: { select: { id: true } },
			country: true,
			isBot: true,
			browserName: true,
			browserVersion: true,
			osName: true,
			osVersion: true,
		},
		orderBy: { createdAt: "desc" },
	});

	const treatedData = visits.map((visit) => {
		let lastAccess = visit.createdAt;

		if (visit.actions.length > 0) {
			lastAccess = visit.actions[0].createdAt;
		}

		return {
			...visit,
			lastAccess,
		};
	});

	const contriesData: { [key: string]: { users: number; bot: number } } = {};

	const isVisitBot = (
		visit: Pick<Visit, "isBot" | "browserName" | "browserVersion" | "osName" | "osVersion">,
	) => {
		return (
			visit.isBot ||
			!visit.browserName ||
			!visit.browserVersion ||
			!visit.osName ||
			!visit.osVersion
		);
	};

	visits.forEach((visit) => {
		if (!visit.country) return;

		if (!contriesData[visit.country]) {
			if (isVisitBot(visit)) {
				contriesData[visit.country] = { users: 0, bot: 1 };
			} else {
				contriesData[visit.country] = { users: 1, bot: 0 };
			}
		} else {
			if (isVisitBot(visit)) {
				contriesData[visit.country].bot += 1;
			} else {
				contriesData[visit.country].users += 1;
			}
		}
	});

	const chartData = Object.entries(contriesData).map(([key, { users, bot }]) => {
		return { key, users, bot };
	});

	return (
		<div className="mx-auto max-w-screen-2xl p-6 pt-20">
			<StatsTable data={treatedData} />
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle className="text-center">Nationalities</CardTitle>
				</CardHeader>
				<CardContent>
					<LineStats data={chartData} />
				</CardContent>
			</Card>
		</div>
	);
};

export default page;
