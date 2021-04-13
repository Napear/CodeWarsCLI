#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@caporal/core");
const axios_observable_1 = __importDefault(require("axios-observable"));
const enums_1 = require("./enums");
const API_URL = 'https://www.codewars.com/api/v1/';
const USER_ENDPOINT = API_URL + 'users/';
function getRequiredScore(rank) {
    switch (rank) {
        case -1: return enums_1.RequiredScore.FIRST;
        case -2: return enums_1.RequiredScore.SECOND;
        case -3: return enums_1.RequiredScore.THIRD;
        case -4: return enums_1.RequiredScore.FOURTH;
        case -5: return enums_1.RequiredScore.FIFTH;
        case -6: return enums_1.RequiredScore.SIXTH;
        case -7: return enums_1.RequiredScore.SEVENTH;
        case -8: return enums_1.RequiredScore.EIGHTH;
        default: return 0;
    }
}
function getRankUpDelta(user, target = 1) {
    const currentScore = user.ranks.overall.score;
    const requiredScore = getRequiredScore(user.ranks.overall.rank + target);
    return requiredScore - currentScore;
}
core_1.program
    .command('score', 'Get users current score')
    .argument('<user>', 'Name of the user to look up')
    .option('-a, --all', 'Return scores for all languages')
    .option('-l, --language <lang>', 'Return score for specified language')
    .action(({ logger, args, options }) => {
    function showAllScores(user) {
        let output = '\tLanguage scores:\n';
        for (let lang in user.ranks.languages) {
            output += `\t\t${lang} score:${user.ranks.languages[lang].score}\n`;
        }
        console.log(output);
    }
    axios_observable_1.default.get(USER_ENDPOINT + args.user)
        .subscribe(response => {
        const user = response.data;
        console.log(`${args.user} info:\n\tOverall score:${user.ranks.overall.score}`);
        if (options.all) {
            showAllScores(user);
        }
        else if (options.language) {
            let lang = options.language.toString().toLowerCase();
            console.log(`\t${lang.toLowerCase()} score:${user.ranks.languages[lang].score || 0}`);
        }
    });
})
    .command('rankUp', "Get shortest path to next rank")
    .argument('<user>', 'Name of the user to look up')
    .option('-t, --target <targetRank>', 'Targeting a specific rank')
    .option('-s, --score-only', 'Return only score required to rank up')
    .action(({ logger, args, options }) => {
    axios_observable_1.default.get(USER_ENDPOINT + args.user)
        .subscribe(response => {
        const user = response.data;
        const rankUpDelta = (options.target) ? getRankUpDelta(user, (+options.target) - user.ranks.overall.rank) : getRankUpDelta(user);
        if (options.scoreOnly) {
            console.log(`${rankUpDelta} points required for next rank`);
        }
        else {
            console.log("Not Yet Implemented");
        }
    });
});
core_1.program.run();
