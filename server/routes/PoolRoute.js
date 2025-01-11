import express from "express"
import { createPoll, getAllPolls, getOnePoll } from "../Controllers/PoolControllers.js"

const Route = express.Router()

Route.get("/", getAllPolls)
Route.get("/:id", getOnePoll)
Route.post("/", createPoll)

export default Route