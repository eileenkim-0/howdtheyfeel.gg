import type { Probabilities } from '../types';

export async function analyzeText(text: string): Promise<Probabilities> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, recipient: 'mom' }),
  });
  if(!response.ok) {
    throw new Error('Analysis failed!');
  }
  const data: { probabilities: Record<string, number> } = await response.json();

  const percents = Object.fromEntries(
    Object.entries(data.probabilities).map(([emotion, value]) => [
      emotion,
      Math.round(value * 100),
    ])
  ) as Probabilities;

  return percents;
}