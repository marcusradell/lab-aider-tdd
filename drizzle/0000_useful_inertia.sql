CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(50) NOT NULL,
	"people" jsonb NOT NULL
);
