import type { Challenge } from "../types";

export const challenges: Challenge[] = [
    { title: 'Make your mom proud', target: 'happy', recipient: 'mom', minPercent: 80, maxWords: 10 },
    { title: 'Scare your coworker', target: 'fear', recipient: 'coworker', minPercent: 85, maxWords: 4 },
    { title: 'Gross out your roommate', target: 'disgust', recipient: 'roommate', minPercent: 75, maxWords: 8 },
    { title: 'Surprise your best friend', target: 'surprised', recipient: 'best friend', minPercent: 80, maxWords: 10 },
    { title: 'Make your boss happy about a mistake', target: 'happy', recipient: 'boss', minPercent: 80, maxWords: 8 },
    { title: 'Make your ex feel sad', target: 'sad', recipient: 'ex', minPercent: 85, maxWords: 6 },
    { title: 'Bore your crush completely', target: 'neutral', recipient: 'crush', minPercent: 90, maxWords: 5 },
    { title: 'Annoy your sibling', target: 'angry', recipient: 'sibling', minPercent: 80, maxWords: 6 },
    { title: 'Make your best friend jealous', target: 'contempt', recipient: 'best friend', minPercent: 70, maxWords: 8 },
    { title: 'Make your dad worry', target: 'fear', recipient: 'dad', minPercent: 75, maxWords: 10 },
    { title: 'Leave your teacher speechless', target: 'surprised', recipient: 'teacher', minPercent: 85, maxWords: 5 },
    { title: 'Make your dog-loving friend disgusted', target: 'disgust', recipient: 'friend', minPercent: 80, maxWords: 5 },
    { title: 'Make grandma cry happy tears', target: 'happy', recipient: 'grandma', minPercent: 90, maxWords: 3 },
    { title: 'Make your mom angry with a compliment', target: 'angry', recipient: 'mom', minPercent: 70, maxWords: 8 },
    { title: 'Make a stranger feel nothing', target: 'neutral', recipient: 'stranger', minPercent: 95, maxWords: 3 },
  ];

const START_DATE = new Date(2026, );

export function getTodayIndex(): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - START_DATE.getTime()) / msPerDay);
}

export function getTodaysChallenge(): Challenge {
  return challenges[getTodayIndex() % challenges.length];
}