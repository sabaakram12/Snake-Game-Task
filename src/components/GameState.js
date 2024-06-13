import  { useEffect, useState } from 'react'
import GamePieces from './GamePieces';





const GameState = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem("highScore")) || 0);
    const [GameOver, setGameOver] =  useState(false);
    const [collision, setCollisionType] = useState("");




   const handleGameover = (type) => {
    setGameOver(true);

   if (score > highScore){
    setHighScore(score);
    localStorage.setItem("highScore" , score.toString())
   }

   setCollisionType(type)


   }


   const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
   }

   useEffect (() => {
    const handleKeyPress = (e)  =>{
        if(GameOver && e.key === "Enter") {
            handleResetGame()
        }
    }

    window.addEventListener("keydown" , handleKeyPress)
   } ,[GameOver])

return(
    <div className='game-container'>
        <p className='score'>Score: {score}</p>
        <p className='high-score'>High Score: {highScore}</p>
        {
            GameOver  && (
                <div className='game-over' >
                    <p >Game Over ! { collision === "wall"? "you Hit the wall" : "you ate yourself" }! </p>
                    <p className='game'>Please press enter to reset the game</p>
                    </div>
            )
        }{
            !GameOver && (
                <GamePieces
                score={score}
                setScore={setScore}
                onGameOver={(type) =>  handleGameover(type) }
                />
            )
        }
    </div>
)

}

export default GameState;
