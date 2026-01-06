import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const translations = pgTable("translations", {
  id: serial("id").primaryKey(),
  english_word: text("english_word").notNull(),
  oshikwanyama_word: text("oshikwanyama_word").notNull(),
  example_sentence: text("example_sentence"),
  created_at: timestamp("created_at").defaultNow(),
});
