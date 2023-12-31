import { useEffect } from "react";
import useOxGame from "../hook/useOxGame";
import CloseIcon from "../assets/CloseIcon.png";

function OxGame() {
  const {
    roundNumber,
    setRoundNumber,
    data,
    isClicked,
    setIsClicked,
    winner,
    setWinner,
    typeToCheck,
    setTypeToCheck,
    user1Symbol,
    user2Symbol,
    user1Win,
    setUser1Win,
    user2Win,
    setUser2Win,
    beginWithUser,
    setBeginWithUser,
    beginSymbol,
    setBeginSymbol,
    handleStartNewGame,
    checkForWin,
    CheckProgress,
    handleClick,
    handleUser1ClickX,
    handleUser1ClickO,
    handleUser2ClickX,
    handleUser2ClickO,
    CheckBeginSymbol,
    winPattern,
    showHowToPlay,
    setShowHowToPlay,
    turnUser1,
    setTurnUser1,
    turnUser2,
    setTurnUser2,
  } = useOxGame();

  useEffect(() => {
    checkForWin(data, typeToCheck);
    if (winner) {
      setIsClicked(Array(9).fill(true));
      if (winner === user1Symbol) {
        setUser1Win((prevUser1Win) => prevUser1Win + 1);
        setBeginWithUser("user2");
        setBeginSymbol(user2Symbol);
        setTurnUser1(true);
        setTurnUser2(false);
      }
      if (winner === user2Symbol) {
        setUser2Win((prevUser2Win) => prevUser2Win + 1);
        setBeginWithUser("user1");
        setBeginSymbol(user1Symbol);
        setTurnUser1(false);
        setTurnUser2(true);
      }
    }
    if (roundNumber === 9 && winner === "") {
      setWinner("No Winner");
    }
  }, [data, winner]);

  const displayO = (
    <div className="relative w-[70%] h-[70%]">
      <div className="absolute w-full h-full border-[5px] border-blue-500 rounded-full"></div>
    </div>
  );
  const displayX = (
    <div className="relative w-[80%] h-[80%]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-blue-500 transform rotate-45"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-blue-500 transform -rotate-45"></div>
    </div>
  );
  return (
    <>
      <main className="w-screen flex justify-center items-center">
        <div className="w-full flex flex-wrap flex-col sm:flex-row xl:flex-row justify-center items-center">
          <section className="w-full h-[25rem] sm:w-[37.5rem] xl:sm:w-[37.5rem] sm:h-[37.5rem] xl:h-[37.5rem] grid grid-cols-3 mt-2 sm:mt-10 xl:mt-10">
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    CheckBeginSymbol();
                    const newType =
                      beginSymbol === "X"
                        ? roundNumber % 2 === 0
                          ? "X"
                          : "O"
                        : roundNumber % 2 === 0
                        ? "O"
                        : "X";
                    setTypeToCheck(newType);
                    handleClick(roundNumber + 1, index + 1, newType);
                    if (!isClicked[index]) {
                      setTurnUser1(!turnUser1);
                      setTurnUser2(!turnUser2);
                      setRoundNumber((prevRoundNumber) => prevRoundNumber + 1);
                      CheckProgress(roundNumber + 1, index + 1, newType);
                    }
                  }}
                  className={`border-2 border-green-500 p-1 flex justify-center items-center ${
                    isClicked[index] ? "pointer-events-none" : ""
                  }
                  ${winPattern[index] ? " bg-yellow-200" : ""}
                  `}
                >
                  {data[index].type === "O" ? displayO : ""}
                  {data[index].type === "X" ? displayX : ""}
                </div>
              ))}
          </section>
          <section className="w-[300px] h-[600px] flex flex-col border-2 border-violet-500 sm:ml-[2rem] xl:ml-[2rem] mt-2 sm:mt-10 xl:mt-10">
            <div className="w-[100%] flex justify-center mt-1 sm:mt-5 xl:mt-5 gap-8">
              <div className="w-[50%] flex flex-col justify-center font-bold text-[20px] ml-6">
                <p
                  className={`text-center text-black w-[6rem] ${
                    turnUser1 ? "bg-green-300" : "bg-yellow-300"
                  } border-1 rounded-lg shadow-lg mb-4`}
                >
                  Player1
                </p>
                <button
                  onClick={handleUser1ClickX}
                  className={`w-[46%] block text-[36px] ml-3 mb-2 ${
                    user1Symbol === "X"
                      ? "bg-blue-500 text-white rounded-full"
                      : ""
                  }`}
                  disabled={roundNumber >= 1 || beginWithUser === "user2"}
                >
                  X
                </button>
                <button
                  onClick={handleUser1ClickO}
                  className={`w-[46%] block text-[36px] ml-3 mb-4 ${
                    user1Symbol === "O"
                      ? "bg-blue-500 text-white rounded-full"
                      : ""
                  }`}
                  disabled={roundNumber >= 1 || beginWithUser === "user2"}
                >
                  O
                </button>
                <div className="inline ml-3 mt-2">Win {user1Win}</div>
                {turnUser1 ? (
                  <div className="ml-3 mt-3 text-white text-center w-[70px] h-[30px] bg-green-500 rounded-lg">
                    Turn
                  </div>
                ) : (
                  <div className="mt-3 w-[70px] h-[30px]"></div>
                )}
              </div>
              <div className="w-[50%] flex flex-col justify-center font-bold text-[20px]">
                <p
                  className={`text-center text-black w-[6rem] ${
                    turnUser2 ? "bg-green-300" : "bg-yellow-300"
                  } border-1 rounded-lg shadow-lg mb-4`}
                >
                  Player2
                </p>
                <button
                  onClick={handleUser2ClickX}
                  className={`w-[46%] block text-[36px] ml-3 mb-2 ${
                    user2Symbol === "X"
                      ? "bg-blue-500 text-white rounded-full"
                      : ""
                  }`}
                  disabled={roundNumber >= 1 || beginWithUser === "user1"}
                >
                  X
                </button>
                <button
                  onClick={handleUser2ClickO}
                  className={`w-[46%] block text-[36px] ml-3 mb-4 ${
                    user2Symbol === "O"
                      ? "bg-blue-500 text-white rounded-full"
                      : ""
                  }`}
                  disabled={roundNumber >= 1 || beginWithUser === "user1"}
                >
                  O
                </button>
                <div className="inline ml-3 mt-2">Win {user2Win}</div>
                {turnUser2 ? (
                  <div className="ml-3 mt-3 text-white text-center w-[70px] bg-green-500 rounded-lg">
                    Turn
                  </div>
                ) : (
                  <div className="mt-3 w-[70px] h-[30px]"></div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mt-1">
              <button
                onClick={handleStartNewGame}
                className="font-bold text-white text-[18px] w-[180px] h-[50px] bg-blue-500 cursor-pointer rounded-lg shadow-xl mt-2 sm:mt-5 xl:mt-5 hover:border-4 hover:border-green-500"
              >
                Start New Game
              </button>
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <div className="text-[20px] font-bold">The winner is</div>
              <div
                className={`text-[48px] mt-2 
                ${
                  winner && winner !== "No Winner"
                    ? "scale-150 transition-all duration-500 ease-in-out delay-300"
                    : ""
                }
                ${
                  winner && winner === "No Winner"
                    ? "scale-110 transition-all duration-500 ease-in-out delay-300"
                    : ""
                }`}
              >
                {winner}
              </div>
              {winner && winner !== "No Winner" && (
                <>
                  <div className="text-[20px] font-bold mt-4">Belong to</div>
                  <div className="text-[48px] mt-1 ">
                    {winner === user1Symbol
                      ? "Player1"
                      : winner === user2Symbol
                      ? "Player2"
                      : ""}
                  </div>{" "}
                </>
              )}
            </div>
          </section>
          <div className="w-[300px] h-[600px] mt-10 sm:ml-5 xl:ml-5">
            {!showHowToPlay && (
              <section className="w-[130px]">
                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="w-full text-[18px] border-2 hover:text-blue-500 hover:font-bold rounded-lg"
                >
                  How to Play
                </button>
              </section>
            )}

            {showHowToPlay && (
              <section className="w-[300px] border-2 border-violet-500">
                <div className="relative">
                  <img
                    onClick={() => setShowHowToPlay(false)}
                    className="absolute right-2 cursor-pointer"
                    src={CloseIcon}
                  />
                </div>
                <div className="font-bold text-[24px] text-left ml-2 mt-3">
                  OX Game
                </div>
                <div className="font-bold text-[18px] text-center mt-4 underline">
                  How to Play
                </div>
                <div className="text-[16px] text-left mt-2 p-2">
                  <ol>
                    <li className="mb-2">
                      1. The winner is the first player to get three of their
                      symbols (either X or O) in a row, column, or diagonal on
                      the 3x3 grid.
                    </li>
                    <li className="mb-2">
                      2. If no player has three in a row, the game is a draw.
                    </li>
                    <li className="mb-2">
                      3. Players who start the game can choose their preferred
                      symbol: X or O.
                    </li>
                    <li className="mb-2">
                      4. After the game begins, player cannot choose a new
                      symbol.
                    </li>
                    <li className="mb-2">
                      5. If the player is the loser, they will have the
                      opportunity to start the game first.
                    </li>
                    <li className="mb-1">
                      6. Please don't refresh the page while playing the game to
                      keep track of the win count.
                    </li>
                  </ol>
                </div>
                <div className="font-bold text-center text-[36px] text-orange-400">
                  Have Fun!
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default OxGame;
