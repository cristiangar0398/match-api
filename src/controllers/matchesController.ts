import { Request, Response } from "express";
import { GetAllMatches } from "../services/matchesService";
import { queryParams, leaguesParams, matchLiveResult, matchNextResult , matchCompleteResult } from '../dto/matchStructure';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


interface filterMatches {
    filterLiveMatches(req: Request, res: Response): void;
    filterNextMatches(req: Request, res: Response): void;
    filterCompletedMatches(req: Request, res: Response): void;
}

export class MatchesRequest implements filterMatches {
    private getAllMatches: GetAllMatches;

    constructor() {
        this.getAllMatches = new GetAllMatches();
        this.filterLiveMatches = this.filterLiveMatches.bind(this);
        this.filterNextMatches = this.filterNextMatches.bind(this);
        this.sendErrorResponse = this.sendErrorResponse.bind(this);
        this.filterCompletedMatches = this.filterCompletedMatches.bind(this)
    }
    
    async filterCompletedMatches(req: Request, res: Response) {
        try {
            const leaguesArray = Object.entries(leaguesParams);
            await Promise.all(leaguesArray.map(async ([key, value]) => {
                const responseData = await this.getAllMatches.getMatches(queryParams.season, value, queryParams.lastMatches);
                matchCompleteResult.complete.push(responseData);
            }));
            res.json(matchCompleteResult)
        } catch (error) {
            console.error("Error al filtrar próximos partidos:", error);
            this.sendErrorResponse(res);
        }
    }

    async filterLiveMatches(req: Request, res: Response) {
        try {
            const result = await this.getAllMatches.getMatches(queryParams.season, null, queryParams.live);
            matchLiveResult.live.push(result);
            res.json(matchLiveResult)
        } catch (error) {
            console.error("Error al filtrar partidos en vivo:", error);
            this.sendErrorResponse(res);
        }
    }

    async filterNextMatches(req: Request, res: Response) {
        try {
            const leaguesArray = Object.entries(leaguesParams);
            await Promise.all(leaguesArray.map(async ([key, value]) => {
                const responseData = await this.getAllMatches.getMatches(queryParams.season, value, queryParams.nextMatches);
                matchNextResult.next.push(responseData);
            }));
            res.json(matchNextResult)
        } catch (error) {
            console.error("Error al filtrar próximos partidos:", error);
            this.sendErrorResponse(res);
        }
    }

    private sendErrorResponse(res: Response) {
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    };
}

