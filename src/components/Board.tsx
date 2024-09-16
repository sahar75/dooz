import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dimensions,
  DimensionValue,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ErrorBoundary } from "./ErrorBoundary";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState<any[]>(new Array(9).fill(null));
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<any[]>([]);

  const handleOnPress = (squareNumber: number) => {
    try {
      if (winner[0] || squares[squareNumber]) return; // Ensure the square is not already taken

      setSquares((prev) => [
        ...prev.slice(0, squareNumber),
        player,
        ...prev.slice(squareNumber + 1),
      ]);
      setPlayer(player === "X" ? "O" : "X");
    } catch (error) {
      console.error("Error handleOnPress:", error);
    }
  };

  const lines: {
    line: any[];
    left: DimensionValue;
    top: DimensionValue;
    rotate: number;
  }[] = [
    { line: [0, 1, 2], left: "50%", top: "-28%", rotate: 90 },
    { line: [3, 4, 5], left: "50%", top: "5%", rotate: 90 },
    { line: [6, 7, 8], left: "50%", top: "38%", rotate: 90 },
    { line: [0, 3, 6], left: "22.5%", top: "5%", rotate: 0 },
    { line: [1, 4, 7], left: "50%", top: "5%", rotate: 0 },
    { line: [2, 5, 8], left: "77.5%", top: "5%", rotate: 0 },
    { line: [0, 4, 8], left: "50%", top: "-10%", rotate: -45 },
    { line: [2, 4, 6], left: "50%", top: "-10%", rotate: 45 },
  ];

  const validateWinner = () => {
    try {
      lines.forEach((x, i) => {
        if (
          squares[x.line[0]] &&
          squares[x.line[0]] === squares[x.line[1]] &&
          squares[x.line[0]] === squares[x.line[2]]
        )
          setWinner([squares[x.line[0]], i]);
      });
    } catch (error) {
      console.error("Error validating winner:", error);
    }
  };

  const handleReset = () => {
    setSquares(new Array(9).fill(null));
    setPlayer("X");
    setWinner([]);
  };

  const line = useMemo(() => lines[winner?.[1]], [winner]);

  useEffect(() => {
    validateWinner();
  }, [squares]);

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        {winner?.[0] ? (
          <Text style={styles.message}>"{winner?.[0]}" is the winner</Text>
        ) : (
          <Text>{player}'s turn!</Text>
        )}

        <View style={styles.boardStyle}>
          {winner?.[0] && (
            <View
              style={{
                width: 2,
                height:
                  winner?.[1] > 5
                    ? (Dimensions.get("window").width * 4) / 4
                    : (Dimensions.get("window").width * 3) / 4,
                backgroundColor: "red",
                position: "absolute",
                left: line?.left,
                top: line?.top,
                transform: line
                  ? [{ rotate: `${line?.rotate}deg` }]
                  : undefined,
                zIndex: 1,
              }}
            />
          )}
          {squares.map((item, i) => (
            <Square
              key={i}
              squareNumber={i}
              onPress={handleOnPress}
              value={item}
            />
          ))}
        </View>
        <View style={styles.resetButton}>
          <Button title="Reset" color="#1d7874" onPress={handleReset} />
        </View>
      </View>
    </ErrorBoundary>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: { marginTop: 50, justifyContent: "center", alignItems: "center" },
  message: { fontSize: 20, color: "#38b000" },
  boardStyle: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "stretch",
    position: "relative",
  },
  resetButton: {
    marginTop: 50,
    color: "#1d7874",
  },
});
