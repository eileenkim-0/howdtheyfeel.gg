import type { Probabilities, Emotion } from "../types";

type Props = {
    probabilities: Probabilities;
    target: Emotion;
}

function EmotionPanel({probabilities, target}:Props){
    return(
        <div className="card">
            <p className="card-title">
                Emotions
                </p>
            {Object.entries(probabilities)
                .sort((a, b) => b[1] - a[1])
                .map(([emotion, percent]) => (

                    <div key={emotion} className={emotion === target ? 'row target' : 'row'}>
                        <div className="row-text">
                            <span>{emotion}</span>
                            <span>{percent}%</span>
                        </div>
                        <div className="bar">
                            <div className="bar-fill" style={{width: `${percent}%`, background: `var(--${emotion})`}}/>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default EmotionPanel;