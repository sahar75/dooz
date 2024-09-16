import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Board from "../components/Board";

const HomeScreen = () => {
  return (
    <View>
      <Text
        style={{
          color: "#b56576",
          marginTop: 40,
          fontSize: 24,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Sahar's Dooz :)
      </Text>
      <Board />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
