import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import "dotenv/config";

import fileRoutes from "./routes/fileRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/files", fileRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
