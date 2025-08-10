import { Text, View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function TabOneScreen() {
  const { themeName, setThemeName, colorScheme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-header-lg text-primary">Primary Header</Text>
      <Text className="mt-2 text-body-lg text-neutral">
        Body text example with {themeName} theme in {colorScheme} mode
      </Text>
      <View className="my-8 h-[1px] w-4/5 bg-neutral" />
      <Text className="text-caption-sm text-accent">Accent caption</Text>

      {/* Theme switcher buttons */}
      <View className="mt-8 flex-row gap-2">
        <Text
          className="rounded bg-primary/10 px-4 py-2 text-body-sm text-primary"
          onPress={() => setThemeName('linguaboost')}
        >
          LinguaBoost
        </Text>
        <Text
          className="rounded bg-primary/10 px-4 py-2 text-body-sm text-primary"
          onPress={() => setThemeName('christmas')}
        >
          Christmas
        </Text>
        <Text
          className="rounded bg-primary/10 px-4 py-2 text-body-sm text-primary"
          onPress={() => setThemeName('ocean')}
        >
          Ocean
        </Text>
      </View>

      {/* Direct CSS variable access example */}
      <Text className="mt-4 text-[--color-primary]">Direct CSS variable access</Text>
    </View>
  );
}
