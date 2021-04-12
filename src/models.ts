export interface Rank {
    rank: number,
    name: string,
    color: string,
    score: number
}

export interface User {
    username: string,
    name: string,
    honor: number,
    clan?: string,
    leaderboardPosition:number,
    skills: Array<string>,
    ranks: {
        overall: Rank,
        languages: {[key:string ]: Rank}
    },
    codeChallenges:{
        totalAuthored: number,
        totalCompleted: number
    }
}