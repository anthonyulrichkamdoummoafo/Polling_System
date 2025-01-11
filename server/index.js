import express from "express";
import cors from "cors";
import connection from "./db.js";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import poolRoutes from "./routes/PoolRoute.js"
import CandidateRoute from "./routes/CandidateRoute.js"
import dotenv from "dotenv";
const app = express();
dotenv.config();
//database connection
connection();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pool', poolRoutes)
app.use("/api/candidate", CandidateRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`)); 