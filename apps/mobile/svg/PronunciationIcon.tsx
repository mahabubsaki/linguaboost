import React from 'react';
import { View } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface PronunciationIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const PronunciationIcon: React.FC<PronunciationIconProps> = ({
  width = 64,
  height = 64,
  color = '#FFFFFF'
}) => {
  const size = Math.min(width, height);

  return (
    <View className="relative items-center justify-center" style={{ width, height }}>
      {/* User icon */}
      <MaterialIcons name="account-circle" size={size * 0.6} color={color} />

      {/* Sound waves */}
      <View className="absolute -right-2 top-1/2 -translate-y-1/2">
        <FontAwesome5 name="volume-up" size={size * 0.3} color={color} />
      </View>
    </View>
  );
};

export default PronunciationIcon;
