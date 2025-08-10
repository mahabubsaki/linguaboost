import { useRef } from 'react';
import { Animated } from 'react-native';

export function usePressableOpacity(
  initial: number = 1,
  active: number = 0.8,
  duration: number = 150
) {
  const opacity = useRef(new Animated.Value(initial)).current;

  const setActive = () => {
    Animated.timing(opacity, {
      toValue: active,
      duration,
      useNativeDriver: true
    }).start();
  };

  const setInactive = () => {
    Animated.timing(opacity, {
      toValue: initial,
      duration,
      useNativeDriver: true
    }).start();
  };

  return { opacity, setActive, setInactive };
}
