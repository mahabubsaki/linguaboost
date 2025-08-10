import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useBounce = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -30,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [bounceAnim]);
  return bounceAnim;
};
export default useBounce;
