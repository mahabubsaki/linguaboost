import useBounce from '@/animations/bounce';
import ThemedIcon from '@/components/ui/ThemedIcon';
import { Feather, Ionicons } from '@expo/vector-icons';

import { Animated, View } from 'react-native';

const Splash = () => {
  const bounceAnim = useBounce();

  return (
    <View className="relative flex flex-row gap-3">
      <View className="flex size-[100px] items-center justify-center rounded-full bg-white">
        <ThemedIcon size={50}>
          <Feather name="globe" />
        </ThemedIcon>
      </View>
      <Animated.View
        className={
          'absolute -right-16 -top-10 flex size-[50px] items-center justify-center rounded-full bg-accent'
        }
        style={{
          transform: [{ translateY: bounceAnim }]
        }}
      >
        <ThemedIcon size={20} color="white">
          <Ionicons name="sparkles-outline" />
        </ThemedIcon>
      </Animated.View>
    </View>
  );
};

export default Splash;
