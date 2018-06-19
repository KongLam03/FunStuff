import React from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import { AnimatedScroll } from "./styled/AnimatedScroll";
import { AnimatedScreenScroll } from "./styled/AnimatedScreenScroll";

const { width } = Dimensions.get("window");

const Screen = props => {
  return (
    <View style={{ width, padding: 20 }}>
      <AnimatedScreenScroll>
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>{props.text}</Text>
      </AnimatedScreenScroll>
    </View>
  );
};

const xOffset = new Animated.Value(0);

export default class ScrollAnimated extends React.Component {
  render() {
    return (
      <AnimatedScroll
        scrollEventThrottle={20}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: xOffset } } }
        ])}
        horizontal
        pagingEnabled
      >
        <Screen text="1" index={0} />
        <Screen text="2" index={1} />
        <Screen text="3" index={2} />
      </AnimatedScroll>
    );
  }
}
