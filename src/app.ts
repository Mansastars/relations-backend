import express,{Request,Response} from "express";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import { database } from "./configurations";
import indexRoutes from "./routes/indexRoutes";

const app = express();

dotenv.config();
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/v1", indexRoutes);
app.get("/", (request: Request, response: Response) => {
  response.redirect("/v1");
});


database
  .sync({})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});

export default app;
