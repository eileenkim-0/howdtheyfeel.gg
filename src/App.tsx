import { useEffect, useState } from "react";
import AttemptsList from "./components/AttemptsList";
import ChallengeHeader from "./components/ChallengeHeader";
import EmotionPanel from "./components/EmotionPanel";
import Face from "./components/Face";
import MessageDock from "./components/MessageDock";
import { fakeChallenge, emptyProbabilities } from "./data/fakeData";
import type { Attempt, Emotion } from "./types";
import { analyzeText } from "./lib/analyze";


function App() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [text, setText] = useState('');
  const [probabilities, setProbabilities] = useState(emptyProbabilities);
  const [isThinking, setIsThinking] = useState(false);

  const MAX_ATTEMPTS = 5;
  const hasWon = attempts.some((a) => a.score >= fakeChallenge.minPercent);
  const hasLost = !hasWon && attempts.length >= MAX_ATTEMPTS;
  const topEmotion = Object.entries(probabilities)
    .sort((a,b) => b[1] - a[1])[0][0] as Emotion;

  useEffect(() => {
    if(text.trim() === ''){
      setIsThinking(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsThinking(true);
      try {
        const percents = await analyzeText(text);
        if(!cancelled) setProbabilities(percents);
      }catch {
        // ignorer...
      }

      if(!cancelled) setIsThinking(false);
    }, 300);

    return() => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text]);

  async function handleSend(text: string) {
    if(hasWon || hasLost) return;
    
    setIsThinking(true);
    let percents;
    try{
      percents = await analyzeText(text);
    }catch{
      setIsThinking(false);
      return;
    }
    setIsThinking(false);
    setProbabilities(percents);

    const newAttempt = {
      text: text,
      score: percents[fakeChallenge.target],
    };
    setAttempts([...attempts, newAttempt]);
  }

  return (
    <div className="page">
      <ChallengeHeader challenge={fakeChallenge} attemptsUsed={attempts.length} maxAttempts={MAX_ATTEMPTS}/>
      <main className="grid">
        <EmotionPanel probabilities={probabilities} target={fakeChallenge.target}/>
        <Face emotion={topEmotion} thinking={isThinking}/>
        <AttemptsList attempts={attempts} hasWon={hasWon} hasLost={hasLost}/>
      </main>
      <MessageDock maxWords={fakeChallenge.maxWords} onSend={handleSend} gameOver={hasWon || hasLost} text={text} setText={setText}/>
    </div>
  );
}

export default App;