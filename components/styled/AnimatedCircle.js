import { Animated } from "react-native";
import styled from "styled-components";

export const AnimatedCircle = styled(Animated.View)`
  height: 50;
  width: 50;
  background-color: green;
  position: absolute;
  border-radius: ${() => 50 / 2};
`;
