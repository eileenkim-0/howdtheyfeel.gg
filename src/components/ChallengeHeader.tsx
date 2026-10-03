import type { Challenge } from "../types";

type Props = {
    challenge: Challenge;
    attemptsUsed: number;
    maxAttempts: number;
};

function ChallengeHeader({challenge, attemptsUsed, maxAttempts}: Props) {
    return(
        <div className="header">
            <p className="header-label">DAILY CHALLENGE</p>
            <h1>{challenge.title}</h1>
            <p className="header-target">Target: {challenge.target} · {challenge.minPercent}%+ · max {challenge.maxWords} words · {Array.from({length: maxAttempts}).map((_, i) =>(
                <span key={i}>{i < attemptsUsed ?'●' : '○'}</span>
            ))}</p>
        </div>
    );
}

export default ChallengeHeader;