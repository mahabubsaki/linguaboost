import React from 'react';
import { View } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

interface PersonalizedLearningIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const PersonalizedLearningIcon: React.FC<PersonalizedLearningIconProps> = ({
  width = 64,
  height = 64,
  color = '#FFFFFF'
}) => {
  const size = Math.min(width, height);

  return (
    <View className="relative items-center justify-center" style={{ width, height }}>
      {/* Target/bullseye icon */}
      <FontAwesome name="bullseye" size={size * 0.8} color={color} />

      {/* Trend arrow */}
      <View className="absolute -right-2 -top-2">
        <MaterialIcons name="trending-up" size={size * 0.3} color="#FF4757" />
      </View>
    </View>
  );
};

export default PersonalizedLearningIcon;
