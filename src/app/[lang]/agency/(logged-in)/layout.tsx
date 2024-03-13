import { auth } from "@/lib/auth";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await auth();

	return <>{children}</>;
}
