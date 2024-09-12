import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";

import fileRoutes from "./routes/fileRoutes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/files", fileRoutes);

app.get("/", (req, res) => {
  console.log("We doing something");
  res.json({ message: "API is running" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
