import { db, pool } from "../db/db.js";
import { matches, commentary } from "../db/schema.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Read data from data.json
    const dataPath = path.join(__dirname, "../data/data.json");
    const rawData = await fs.readFile(dataPath, "utf-8");
    const { matches: matchesData, commentary: commentaryData } = JSON.parse(rawData);

    // Clear existing data (optional, but good for testing)
    console.log("🧹 Clearing existing data...");
    await db.delete(commentary);
    await db.delete(matches);

    // Insert matches and store their IDs
    console.log(`Inserting ${matchesData.length} matches...`);
    const insertedMatches = await db.insert(matches).values(matchesData).returning();

    // Map commentary to inserted matches
    const commentaryToInsert = commentaryData.map((c) => {
      const { matchIndex, ...rest } = c;
      return {
        ...rest,
        matchId: insertedMatches[matchIndex].id,
      };
    });

    if (commentaryToInsert.length > 0) {
      console.log(`Inserting ${commentaryToInsert.length} commentary items...`);
      await db.insert(commentary).values(commentaryToInsert);
    }

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
