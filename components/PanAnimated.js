import React from "react";
import { PanResponder, Dimensions, Animated } from "react-native";
import { AnimatedCircle } from "./styled/AnimatedCircle";
const { width, height } = Dimensions.get("window");
const halfWidth = width / 2;

export default class PanAnimated extends React.Component {
  _panResponder = {};
  animatedPosition = new Animated.ValueXY();
  lastState = new Animated.ValueXY();

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this.setNativeColorProp("green");
        Animated.event([
          null,
          {
            dx: this.animatedPosition.x,
            dy: this.animatedPosition.y
          }
        ])(evt, gestureState);
        if (evt.nativeEvent.pageX > halfWidth) {
          this.setNativeColorProp("red");
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
        // this.animateTimer();
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
        if (
          this.lastState.x.__getValue() < 5 ||
          this.lastState.x.__getValue() > width - 50 ||
          this.lastState.y.__getValue() < 5 ||
          this.lastState.y.__getValue() > height - 75
        ) {
          this.animateTimer();
        }
        this.animatedPosition.setValue({ x: 0, y: 0 });
      }
    });
  }

  animateTimer() {
    Animated.timing(this.lastState.x, {
      toValue: halfWidth - 25,
      duration: 1000
    }).start();
    Animated.timing(this.lastState.y, {
      toValue: height / 3,
      duration: 1000
    }).start();
    this.setNativeColorProp("green");
  }

  setNativeColorProp(color) {
    this.refs.setNativeProps({
      backgroundColor: color
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
