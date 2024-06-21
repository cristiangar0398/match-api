const axios = require('axios');
const apiPathFootball: string = "https://v3.football.api-sports.io/fixtures?";
const API_HOST: string = "v3.football.api-sports.io";
const API_KEY: string = "b86d2bee0b2bdfa86bbfcffa592b5810";

interface MatchResult {
    response: any[];
}

export class GetAllMatches {

    constructor() {
        this.getMatches = this.getMatches.bind(this);
    }

    /**
     * get live or next matches 
     */
    async getMatches(season: string | undefined, league: string | null, matchStatus: string | undefined): Promise<MatchResult> {
        let endpoint: string = `${apiPathFootball}season=${season}`;

        if (league) {
            endpoint += `&league=${league}`;
        }

        if (matchStatus !== 'all') {
            endpoint += (matchStatus === '10') ? `&next=${matchStatus}` : `&last=${matchStatus}`;
        } else {
            endpoint += `&live=${matchStatus}`;
        }
        
        const matchesResult: MatchResult = await this.useAxios(endpoint);
        return matchesResult;
    }

    private async useAxios(path: string): Promise<any> {
        try {
            const response = await axios.get(path, {
                headers: {
                    'x-rapidapi-host': API_HOST,
                    'x-rapidapi-key': API_KEY
                }
            });
            return response.data;
        } catch (error: any) {
            throw new Error(`Error al consumir la API: ${error.message}`);
        }
    }

}
