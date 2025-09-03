import React from 'react';
import { View, Text } from 'react-native';

interface OnboardingCardProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundColor: string;
  icon: React.ReactNode;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({
  title,
  subtitle,
  description,
  backgroundColor,
  icon
}) => {
  return (
    <View
      className="mx-8 my-16 min-h-[400px] items-center justify-center rounded-3xl p-8"
      style={{ backgroundColor }}
    >
      <View className="mb-6">{icon}</View>

      <View className="mb-4">
        <Text className="mb-2 text-center text-sm font-medium text-white">{subtitle}</Text>
      </View>

      <Text className="mb-6 text-center text-2xl font-bold text-white">{title}</Text>

      <Text className="text-center text-base leading-6 text-white opacity-90">{description}</Text>
    </View>
  );
};

export default OnboardingCard;
