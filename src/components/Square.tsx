import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Square = ({
  squareNumber,
  onPress,
  value,
}: {
  squareNumber: number;
  onPress: (value: number) => void;
  value: "X" | "O";
}) => {
  return (
    <TouchableOpacity
      style={styles.square}
      onPress={() => onPress(squareNumber)}
      disabled={Boolean(value)}
    >
      <View>
        <Text style={styles.textStyle}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Square;

const styles = StyleSheet.create({
  square: {
    width: "25%",
    aspectRatio: 1,
    backgroundColor: "#eeeeee",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 50,
  },
});
