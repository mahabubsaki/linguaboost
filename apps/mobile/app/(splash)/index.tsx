import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import ThemedIcon from '@/components/ui/ThemedIcon';

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <View className="flex size-[100px] items-center justify-center rounded-full bg-white">
        <ThemedIcon size={50}>
          <Feather name="globe" />
        </ThemedIcon>
      </View>
    </View>
  );
}
