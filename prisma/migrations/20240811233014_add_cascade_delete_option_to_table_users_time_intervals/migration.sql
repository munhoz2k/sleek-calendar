-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_time_intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    CONSTRAINT "users_time_intervals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users_time_intervals" ("id", "time_end_in_minutes", "time_start_in_minutes", "user_id", "week_day") SELECT "id", "time_end_in_minutes", "time_start_in_minutes", "user_id", "week_day" FROM "users_time_intervals";
DROP TABLE "users_time_intervals";
ALTER TABLE "new_users_time_intervals" RENAME TO "users_time_intervals";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
