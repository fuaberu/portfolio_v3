import { relations } from "drizzle-orm";
import { text, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
	id: serial("id").primaryKey(),
	text: text("text").notNull(),
	email: text("email").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at"),
});

export const visits = pgTable("visits", {
	id: serial("id").primaryKey(),
	visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const visitsRelations = relations(visits, ({ many }) => ({
	action: many(actions),
}));

export const actions = pgTable("actions", {
	id: serial("id").primaryKey(),
	action: text("text").notNull(),
	visitId: serial("visit_id")
		.references(() => visits.id, {
			onDelete: "cascade",
		})
		.notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const actionsRelations = relations(actions, ({ one }) => ({
	visit: one(visits, {
		fields: [actions.visitId],
		references: [visits.id],
	}),
}));
