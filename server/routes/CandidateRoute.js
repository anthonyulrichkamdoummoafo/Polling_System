import express from "express";
import { createCandidate, getOneCandidate } from "../Controllers/CandidateControllers.js";

const Route = express.Router();

Route.get("/:id", getOneCandidate);
Route.post("/", createCandidate);

export default Route