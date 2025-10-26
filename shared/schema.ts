import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  age: integer("age"),
});

export const medications = pgTable("medications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  instructions: text("instructions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthMetrics = pgTable("health_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(),
  value: integer("value"),
  systolic: integer("systolic"),
  diastolic: integer("diastolic"),
  unit: text("unit").notNull(),
  date: timestamp("date").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertMedicationSchema = createInsertSchema(medications).omit({ id: true, userId: true, createdAt: true });
export const insertHealthMetricSchema = createInsertSchema(healthMetrics).omit({ id: true, userId: true, date: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;
export type Medication = typeof medications.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricSchema>;
export type HealthMetric = typeof healthMetrics.$inferSelect;
