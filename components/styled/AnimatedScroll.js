import { Animated, Dimensions } from "react-native";
import styled from "styled-components";
const { width, height } = Dimensions.get("window");

export const AnimatedScroll = styled(Animated.ScrollView)`
  height: ${() => height};
  width: ${() => width};
  background-color: orange;
`;
