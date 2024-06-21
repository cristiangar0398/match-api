import express, { Router } from "express";
import { MatchesRequest } from "../../controllers/matchesController";

const router: Router = express.Router();
const matches = new MatchesRequest();

router.get("/live", matches.filterLiveMatches)
      .get("/next", matches.filterNextMatches)
      .get("/last", matches.filterCompletedMatches);

export = router;
