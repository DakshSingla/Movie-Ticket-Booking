import express from  "express";

import { addShow, getNowPlayingMovies } from "../controllers/showControllers.js";

const showoRouter = express.Router();
showoRouter.get('/now-playing', getNowPlayingMovies)
showoRouter.post('/add', addShow)
export default showoRouter;