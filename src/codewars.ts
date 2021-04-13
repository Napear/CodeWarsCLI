#!/usr/bin/env node

import { program } from "@caporal/core"
import Axios from "axios-observable"
import { using } from "rxjs"
import { RequiredScore } from "./enums"
import {User} from './models'

const API_URL = 'https://www.codewars.com/api/v1/'
const USER_ENDPOINT = API_URL+'users/'

function getRequiredScore(rank: number): number {    
    switch(rank){
        case -1: return RequiredScore.FIRST
        case -2: return RequiredScore.SECOND
        case -3: return RequiredScore.THIRD
        case -4: return RequiredScore.FOURTH
        case -5: return RequiredScore.FIFTH
        case -6: return RequiredScore.SIXTH
        case -7: return RequiredScore.SEVENTH
        case -8: return RequiredScore.EIGHTH
        default: return 0
    }
}

function getRankUpDelta(user: User, target: number = 1): number {
    const currentScore = user.ranks.overall.score
    const requiredScore = getRequiredScore(user.ranks.overall.rank+target)
    return requiredScore-currentScore
}

program
    .command('score', 'Get users current score')
    .argument('<user>', 'Name of the user to look up')
    .option('-a, --all', 'Return scores for all languages')
    .option('-l, --language <lang>', 'Return score for specified language')
    .action(({ logger, args, options }) => {
        function showAllScores(user:User){
            let output = '\tLanguage scores:\n'
            for (let lang in user.ranks.languages){
                output += `\t\t${lang} score:${user.ranks.languages[lang].score}\n`
            }
            console.log(output)
        }
        Axios.get(USER_ENDPOINT+args.user)
            .subscribe(response => {
                const user: User = response.data
                console.log(`${args.user} info:\n\tOverall score:${user.ranks.overall.score}`)
                if(options.all){
                    showAllScores(user)
                } else if (options.language){
                    let lang:string = options.language.toString().toLowerCase()
                    console.log(`\t${lang.toLowerCase()} score:${user.ranks.languages[lang].score || 0}`)
                }
            }
        )
    })

    .command('rankup', "Get shortest path to next rank")
    .argument('<user>', 'Name of the user to look up')
    .option('-t, --target <targetRank>', 'Targeting a specific rank')
    .option('-s, --score-only', 'Return only score required to rank up')
    .action(({logger, args, options}) =>{
        Axios.get(USER_ENDPOINT+args.user)
            .subscribe(response => {
                const user: User = response.data
                const rankUpDelta = (options.target) ? getRankUpDelta(user, (+options.target)-user.ranks.overall.rank) : getRankUpDelta(user)
                if (options.scoreOnly){
                    console.log(`${args.user} requires ${rankUpDelta} points to rank up!`)
                } else {
                    console.log("Not Yet Implemented")
                }
            })
    })

program.run()