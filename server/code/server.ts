import express, { Request, Response } from "express";
import cors from "cors";
import {
  getCodeCardData,
  getContactData,
  getDesignCardData,
  getRepoData,
  getSkillsData,
  getTopRepoData,
} from "./db.ts";
import { updateDb } from "./handleGit.ts";

const app = express();
app.use(express.json());
app.use(cors<Request>());

app.listen(4060, () => console.log("hey all, port 4060 here"));

app.get("/", (_: Request, res: Response) =>
  res.json({ status: "200", data_path: "/api/*" })
);

app.get("/api/get-designs", async (_: Request, res: Response) => {
  return res.json(await getDesignCardData());
});

app.get("/api/get-skills", async (_: Request, res: Response) => {
  return res.json(await getSkillsData());
});

app.get("/api/get-repo/solo/:name", async (req: Request, res: Response) => {
  const { name } = await req.params;
  await updateDb();
  return res.json(await getRepoData(name));
});

app.get("/api/get-repo/card", async (_: Request, res: Response) => {
  await updateDb();
  return res.json(await getCodeCardData());
});

app.get("/api/get-repo/top", async (_: Request, res: Response) => {
  await updateDb();
  return res.json(await getTopRepoData());
});

app.get("/api/get-links", async (_: Request, res: Response) => {
  return res.json(await getContactData());
});
