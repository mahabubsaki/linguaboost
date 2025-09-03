import React from 'react';
import { View } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface AIConversationIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const AIConversationIcon: React.FC<AIConversationIconProps> = ({
  width = 64,
  height = 64,
  color = '#FFFFFF'
}) => {
  const size = Math.min(width, height);

  return (
    <View className="relative items-center justify-center" style={{ width, height }}>
      {/* Robot icon */}
      <FontAwesome5 name="robot" size={size * 0.7} color={color} />

      {/* Chat bubble */}
      <View className="absolute -right-1 -top-1">
        <MaterialIcons name="chat-bubble" size={size * 0.4} color={color} />
      </View>
    </View>
  );
};

export default AIConversationIcon;
