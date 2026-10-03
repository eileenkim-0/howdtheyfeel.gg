import type { Attempt } from "../types";

type Props = {
    attempts: Attempt[];
    hasWon: boolean;
    hasLost: boolean;
}

function AttemptsList({attempts, hasWon, hasLost}:Props){
    return(
        <div className="card attempts">
            <p className="card-title">Your attempts</p>
            {attempts.length === 0 && <p>No attempts yet</p>}
            {attempts.map((attempt, i) => (
                <div key={i} className="row-text">
                    <span>"{attempt.text}"</span>
                    <span>{attempt.score}%</span>
                </div>
            ))}
            {hasWon && <p className="result">🎉 You won!</p>}
            {hasLost && <p className="result">Try again tomorrow! :(</p>}
        </div>
    );
}

export default AttemptsList;