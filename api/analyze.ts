import { experimental_evaluate as evaluate} from 'ai';

export async function POST(request: Request) {
  const {text, recipient} = await request.json();

  if(!text || typeof text !== 'string') {
      return Response.json({ error: 'Missing text' }, { status: 400 });
  }

  try{
    const result = await evaluate({
      model: 'typesafe-ai/jev',
      state: `Message to my ${recipient}: "${text}"`,
      questions: {
        emotion: {
          type: 'choice',
          instructions: 'How would the recipient most likely feel after reading this message?',
          criteria: {
            neutral: 'Feels nothing in particular',
            happy: 'Feels happy, proud, loved or grateful',
            sad: 'Feels sad, hurt or disappointed',
            angry: 'Feels angry, annoyed or offended',
            surprised: 'Feels surprised or shocked',
            fear: 'Feels worried, scared or anxious',
            disgust: 'Feels disgusted or repulsed',
            contempt: 'Feels contempt, superior or dismissive',
          },
        },
      },
    });
    
    return Response.json({ probabilities: result.answers.emotion.probabilities });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Could not analyze message' }, { status: 500 });
  }
}