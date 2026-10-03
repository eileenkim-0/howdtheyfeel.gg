import type { Challenge, Attempt, Probabilities } from "../types";

export const fakeChallenge: Challenge = {
    title: "Make your mom proud",
    target: "happy",
    minPercent: 80,
    maxWords: 10,
}

export const fakeAttempts: Attempt[] = [
    {
        text: "Mom i got my dream job!",
        score: 78
    },
    {
        text: "Thank you for everything mom",
        score: 67
    }
]

export const emptyProbabilities: Probabilities = {
    neutral: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
    angry: 0,
    fear: 0,
    disgust: 0,
    contempt: 0,
}