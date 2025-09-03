import React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { usePressableOpacity } from '@/animations/pressableOpacity';
import { useRouter } from 'expo-router';

const TextSection = () => {
  const { opacity, setActive, setInactive } = usePressableOpacity(1, 0.89, 150);
  const router = useRouter();
  return (
    <View className="flex flex-col items-center gap-3 px-6 py-8">
      <Text className="mb-2 text-header-lg text-white">LinguaAI</Text>
      <Text className="mb-1 text-subheader-sm font-normal text-white">Master any language</Text>
      <Text className="mb-4 text-subheader-sm font-normal text-white">
        with AI that adapts to you
      </Text>
      <View className="mb-4 w-full">
        <Animated.View style={{ opacity }}>
          <Pressable
            className="w-[150px] rounded-3xl bg-white py-2"
            onPressIn={setActive}
            onPressOut={setInactive}
            onPress={() => router.navigate('/(carousal)')}
          >
            <Text className="text-center text-body-lg font-semibold text-primary">Get Started</Text>
          </Pressable>
        </Animated.View>
      </View>
      <Text className="mt-2 text-caption-sm text-white">Join millions learning with AI</Text>
    </View>
  );
};

export default TextSection;
