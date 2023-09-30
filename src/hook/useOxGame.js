import { useState } from "react";

function useOxGame() {
  const [roundNumber, setRoundNumber] = useState(0);
  const [data, setData] = useState(
    Array(9).fill({ round: 0, area: 0, type: "" })
  );
  const [isClicked, setIsClicked] = useState(Array(9).fill(false));
  const [winner, setWinner] = useState("");
  const [typeToCheck, setTypeToCheck] = useState("");
  const [user1Symbol, setUser1Symbol] = useState("X");
  const [user2Symbol, setUser2Symbol] = useState("O");
  const [user1Win, setUser1Win] = useState(0);
  const [user2Win, setUser2Win] = useState(0);
  const [beginWithUser, setBeginWithUser] = useState("user1");
  const [beginSymbol, setBeginSymbol] = useState("X");
  const [winPattern, setWinPattern] = useState(Array(9).fill(false));
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [turnUser1, setTurnUser1] = useState(true);
  const [turnUser2, setTurnUser2] = useState(false);

  const handleStartNewGame = () => {
    setData(Array(9).fill({ round: 0, area: 0, type: "" }));
    setIsClicked(Array(9).fill(false));
    setWinner("");
    setTypeToCheck("");
    setRoundNumber(0);
    setWinPattern(Array(9).fill(false));
    setTurnUser1(beginWithUser === "user1");
    setTurnUser2(beginWithUser === "user2");
  };

  function checkForWin(data, typeToCheck) {
    // Check horizontal lines
    if (typeToCheck !== "") {
      if (
        data[0].type === typeToCheck &&
        data[1].type === typeToCheck &&
        data[2].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 0; i < 3; i++) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }
      if (
        data[3].type === typeToCheck &&
        data[4].type === typeToCheck &&
        data[5].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 3; i < 6; i++) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }
      if (
        data[6].type === typeToCheck &&
        data[7].type === typeToCheck &&
        data[8].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 6; i < 9; i++) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }

      // Check column
      if (
        data[0].type === typeToCheck &&
        data[3].type === typeToCheck &&
        data[6].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 0; i < 7; i += 3) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }
      if (
        data[1].type === typeToCheck &&
        data[4].type === typeToCheck &&
        data[7].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 1; i < 8; i += 3) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }
      if (
        data[2].type === typeToCheck &&
        data[5].type === typeToCheck &&
        data[8].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 2; i < 9; i += 3) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }

      // Cross lines
      if (
        data[0].type === typeToCheck &&
        data[4].type === typeToCheck &&
        data[8].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 0; i < 9; i += 4) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }

      if (
        data[2].type === typeToCheck &&
        data[4].type === typeToCheck &&
        data[6].type === typeToCheck
      ) {
        const newWinPattern = [...winPattern];
        for (let i = 2; i < 7; i += 2) {
          newWinPattern[i] = true;
        }
        setWinPattern(newWinPattern);
        return setWinner(typeToCheck);
      }
    }
    return false; // No win
  }

  const CheckProgress = (newRound, newArea, newType) => {
    setRoundNumber(newRound);
    handleClick(newRound, newArea, newType);
  };

  const handleClick = (newRound, areaNumber, newType) => {
    if (!isClicked[areaNumber - 1]) {
      setIsClicked((prevIsClicked) => {
        const updatedIsClicked = [...prevIsClicked];
        updatedIsClicked[areaNumber - 1] = true;
        return updatedIsClicked;
      });

      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[areaNumber - 1] = {
          round: newRound,
          area: areaNumber,
          type: newType,
        };
        return updatedData;
      });
    }
  };

  const handleUser1ClickX = () => {
    setUser1Symbol("X");
    setUser2Symbol("O");
    beginWithUser === "user1" ? setBeginSymbol("X") : "";
  };

  const handleUser1ClickO = () => {
    setUser1Symbol("O");
    setUser2Symbol("X");
    beginWithUser === "user1" ? setBeginSymbol("O") : "";
  };

  const handleUser2ClickX = () => {
    setUser2Symbol("X");
    setUser1Symbol("O");
    beginWithUser === "user2" ? setBeginSymbol("X") : "";
  };

  const handleUser2ClickO = () => {
    setUser2Symbol("O");
    setUser1Symbol("X");
    beginWithUser === "user2" ? setBeginSymbol("O") : "";
  };

  const CheckBeginSymbol = () => {
    if (beginWithUser === "user1") {
      setBeginSymbol(user1Symbol);
    }
    if (beginWithUser === "user2") {
      setBeginSymbol(user2Symbol);
    }
  };

  return {
    roundNumber,
    setRoundNumber,
    data,
    setData,
    isClicked,
    setIsClicked,
    winner,
    setWinner,
    typeToCheck,
    setTypeToCheck,
    user1Symbol,
    setUser1Symbol,
    user2Symbol,
    setUser2Symbol,
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
    setWinPattern,
    showHowToPlay,
    setShowHowToPlay,
    turnUser1,
    setTurnUser1,
    turnUser2,
    setTurnUser2,
  };
}

export default useOxGame;
