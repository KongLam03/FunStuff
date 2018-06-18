import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";
import styled from "styled-components";
const { width, height } = Dimensions.get("window");
const centerCircle = width / 2 - 25;

const AnimatedCircle = styled(Animated.View)`
  height: 50;
  width: 50;
  background-color: green;
  position: absolute;
  border-radius: ${() => 50 / 2};
`;

class PanAnimated extends React.Component {
  _panResponder = {};
  animatedPosition = new Animated.ValueXY();
  lastState = new Animated.ValueXY();

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this.refs.setNativeProps({
          backgroundColor: "green"
        });
        Animated.event([
          null,
          {
            dx: this.animatedPosition.x,
            dy: this.animatedPosition.y
          }
        ])(evt, gestureState);
        if (evt.nativeEvent.pageX > centerCircle) {
          this.refs.setNativeProps({
            backgroundColor: "red"
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.lastState.setValue({
          x:
            this.animatedPosition.x.__getValue() +
            this.lastState.x.__getValue(),
          y:
            this.animatedPosition.y.__getValue() + this.lastState.y.__getValue()
        });
        this.animateTimer();
        // if (this.lastState.x.__getValue() < width / 6) {
        //   this.lastState.setValue({
        //     x: 0,
        //     y: this.lastState.y.__getValue()
        //   });
        // } else if (this.lastState.x.__getValue() > width / 2) {
        //   this.lastState.setValue({
        //     x: width - width / 3,
        //     y: this.lastState.y.__getValue()
        //   });
        // } else {
        //   this.lastState.setValue({
        //     x: width / 3,
        //     y: this.lastState.y.__getValue()
        //   });
        // }
        this.animatedPosition.setValue({ x: 0, y: 0 });
      }
    });
  }

  animateTimer() {
    Animated.timing(this.lastState.x, {
      toValue: centerCircle,
      duration: 1000
    }).start();
    this.refs.setNativeProps({
      backgroundColor: "green"
    });
  }

  render() {
    return (
      <AnimatedCircle
        ref={ref => (this.refs = ref)}
        {...this._panResponder.panHandlers}
        style={{
          transform: [
            {
              translateX: Animated.add(
                this.animatedPosition.x,
                this.lastState.x
              )
            },
            {
              translateY: Animated.add(
                this.animatedPosition.y,
                this.lastState.y
              )
            }
          ]
        }}
      />
    );
  }
}

const App = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <PanAnimated />
    </View>
  );
};

export default App;
