import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import v1LaLigaRouter from './v1/routes/index';

const app: Application = express();
const PORT: number = 3000;

app.use("/ABRM-API/v1", v1LaLigaRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});