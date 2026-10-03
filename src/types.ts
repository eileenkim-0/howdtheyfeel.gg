
export type Emotion = 
| 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'fear' | 'disgust' | 'contempt';

export type Challenge = {
    title: string;
    target: Emotion;
    minPercent: number;
    maxWords: number;
}

export type Attempt = {
    text: string;
    score: number;
}

export type Probabilities = Record<Emotion, number>;