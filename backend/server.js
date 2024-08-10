import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { productRoute } from "./middleware/productRoute.js";

const port = ENV_VARS.PORT;

const app = express();
app.use(express.json()); //will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", productRoute, movieRoutes);
app.use("/api/v1/tv", productRoute, tvRoutes);
app.use("/api/v1/search", productRoute, searchRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
  connectDB();
});
