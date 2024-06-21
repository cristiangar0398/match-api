export interface MatchLiveResult {
    live: any[];
}

export interface MatchNextResult {
    next: any[];
}

export interface MatchCompleteResult {
    complete: any[];
}

export interface QueryParams {
    season?: string;
    live?: string;
    lastMatches?: string;
    nextMatches?: string;
}

export interface LeaguesParams {
    leagueSpain: string | null;
    premierLeague: string | null;
    leagueItalian: string | null;
    leagueGerman: string | null;
    leagueFrance: string | null;
    uefaChampionsLeague: string | null;
    europeanLeague: string | null;
    colombianLeague: string | null;
    libertadoresCup: string | null;
    americanCup: string | null;
}

export const queryParams: QueryParams = {
    season: process.env.SEASON,
    live: process.env.LIVE_MATCHES,
    lastMatches : process.env.LAST_MATCHES ,
    nextMatches: process.env.NEXT_MATCHES,
};

export const leaguesParams: LeaguesParams = {
    leagueSpain: process.env.LEAGUE_SPAIN || null,
    premierLeague: process.env.PREMIER_LEAGUE || null,
    leagueItalian: process.env.ITALIAN_LEAGUE || null,
    leagueGerman: process.env.GERMAN_LEAGUE || null,
    leagueFrance: process.env.FRENCH_LEAGUE || null,
    uefaChampionsLeague: process.env.UEFA_CHAMPIONS_LEAGUE || null,
    europeanLeague: process.env.EUROPEAN_LEAGUE || null,
    colombianLeague: process.env.COLOMBIAN_LEAGUE || null,
    libertadoresCup: process.env.LIBERTADORES_CUP || null,
    americanCup: process.env.SOUTH_AMERICAN_CUP || null,
};


export const matchLiveResult : MatchLiveResult ={
    live:[]
}

export const matchNextResult : MatchNextResult ={
    next:[]
}

export const matchCompleteResult : MatchCompleteResult ={
    complete:[]
}