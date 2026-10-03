
type Props = {
    maxWords: number;
    onSend: (text: string) => void;
    gameOver: boolean;
    text: string;
    setText: (text: string) => void;
}

function MessageDock({maxWords, onSend, gameOver, text, setText}:Props) {
    const wordCount = text.trim() === '' ? 0 : text.trim().split(' ').length;
    const wordsLeft = maxWords - wordCount;
    const canSend = wordCount >0 && wordsLeft>= 0;

    return(
        <form className="dock" onSubmit={(e)=> {
            e.preventDefault();
            if (!canSend || gameOver) return;
            onSend(text);
            setText('');
        }}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your message ..."
                disabled={gameOver}
            />
            <span className={wordsLeft < 0 ? 'words-left over' : 'words-left'}>{wordsLeft} words left</span>
            <button disabled={!canSend || gameOver} type="submit">Send</button>
        </form>
    );
}

export default MessageDock;