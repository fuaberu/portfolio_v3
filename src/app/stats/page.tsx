import { db } from "@/lib/db";
import { StatsTable } from "./_components/stats-table";
import { addHours } from "date-fns";
import { LineStats } from "@/components/ui/line-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { PasswordPromptDialog } from "@/components/password-prompt";

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

	const contriesData: { [key: string]: number } = {};

	visits.forEach((visit) => {
		if (!visit.country) return;

		if (typeof contriesData[visit.country] === "number") {
			contriesData[visit.country] += 1;
		} else {
			contriesData[visit.country] = 1;
		}
	});

	const chartData = Object.entries(contriesData).map(([key, value]) => {
		return { key, value };
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
