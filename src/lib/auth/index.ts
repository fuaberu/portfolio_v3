"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { Role, User } from "@prisma/client";
import { z } from "zod";
import { addDays, addMinutes } from "date-fns";

export interface UserSession {
	id: string;
	name: string;
	email: string | null;
	role: Role;
}

const UserSessionSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().nullable(),
	role: z.nativeEnum(Role),
});

export interface UserRefreshSession {
	id: string;
}

const agencyLoginUrl = "/agency/auth/sign-in";

export function auth(noRedirect: true): Promise<UserSession | null>;

export function auth(noRedirect?: false): Promise<UserSession | never>;

export async function auth(noRedirect?: boolean): Promise<UserSession | null> {
	if (!process.env.JWT_TOKEN_SECRET) {
		if (!noRedirect) {
			return redirect(agencyLoginUrl);
		} else {
			return null;
		}
	}

	const session = cookies().get("session");

	if (!session) {
		if (!noRedirect) {
			return redirect(agencyLoginUrl);
		} else {
			return null;
		}
	}

	try {
		const sessionData = await jwtVerify(
			session.value,
			new TextEncoder().encode(process.env.JWT_TOKEN_SECRET),
		);

		const validatedSession = UserSessionSchema.safeParse(sessionData.payload);

		if (!validatedSession.success) {
			if (!noRedirect) {
				return redirect(agencyLoginUrl);
			} else {
				return null;
			}
		}

		return {
			id: validatedSession.data.id,
			name: validatedSession.data.name,
			email: validatedSession.data.email || null,
			role: validatedSession.data.role,
		};
	} catch (err) {}

	if (!noRedirect) {
		return redirect(agencyLoginUrl);
	} else {
		return null;
	}
}

export const signOut = () => {
	cookies().delete("session");
	cookies().delete("refresh");
};

export const createSession = async ({
	user,
}: {
	user: Pick<User, "id" | "name" | "email" | "role">;
}) => {
	// Clean cookies
	cleanCookies();

	// Create session object
	const tokenData = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	} satisfies UserSession;

	// Sign the session
	const signSession = await signSessionPayload(tokenData);

	// Set session cookie
	setSessionCookie(signSession);

	// Create refresh session object
	const refreshData = { id: user.id };

	// Sign the refresh session
	const signRefreshSession = await signRefreshPayload(refreshData);

	// Set refresh session cookie
	await setRefreshSessionCookie(signRefreshSession);
};

export const updateSession = async ({ user }: { user?: Partial<User> }) => {
	//	Clean cookies
	cleanCookies();

	const currentSession = await auth();

	// Create session object
	const tokenData = {
		...currentSession,
		...user,
	} satisfies Partial<UserSession>;

	// Sign the session
	const signSession = await signSessionPayload(tokenData);

	// Set session cookie
	setSessionCookie(signSession);
};

const cleanCookies = () => {
	cookies().delete("trial");
};

export const signSessionPayload = async (payload: Partial<UserSession>) => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setProtectedHeader({ typ: "JWT", alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15min")
		.sign(new TextEncoder().encode(process.env.JWT_TOKEN_SECRET));
};

export const setSessionCookie = (session: string) => {
	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		path: "/",
		expires: addMinutes(new Date(), 15),
		priority: "high",
	});
};

export const signRefreshPayload = async (payload: { id: string }) => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setProtectedHeader({ typ: "JWT", alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("30d")
		.sign(new TextEncoder().encode(process.env.JWT_REFRESH_TOKEN_SECRET));
};

export const setRefreshSessionCookie = async (refresh: string) => {
	cookies().set("refresh", refresh, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		path: "/",
		expires: addDays(new Date(), 30),
		priority: "high",
	});
};
