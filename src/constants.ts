export enum ScoreAward {
    EIGHTH = 2,
    SEVENTH = 3,
    SIXTH = 8,
    FIFTH = 21,
    FOURTH = 55,
    THIRD = 149,
    SECOND = 404,
    FIRST = 1097
}

export enum RequiredScore {
    EIGHTH = 0,
    SEVENTH = 20,
    SIXTH = 76,
    FIFTH = 229,
    FOURTH = 643,
    THIRD = 1768,
    SECOND = 4829,
    FIRST = 13147
}

export const PUZZLE_SCORES = {
    '1st kyu':ScoreAward.FIRST, 
    '2nd kyu':ScoreAward.SECOND, 
    '3rd kyu':ScoreAward.THIRD, 
    '4th kyu':ScoreAward.FOURTH, 
    '5th kyu':ScoreAward.FIFTH, 
    '6th kyu':ScoreAward.SIXTH, 
    '7th kyu':ScoreAward.SEVENTH, 
    '8th kyu':ScoreAward.EIGHTH
}