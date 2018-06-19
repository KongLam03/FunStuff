import React from "react";
import { View } from "react-native";
import { Constants } from "expo";
import PanAnimated from "./components/PanAnimated";
import ScrollAnimated from "./components/ScrollAnimated";

const App = () => {
  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      <ScrollAnimated />
    </View>
  );
};

export default App;
