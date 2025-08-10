import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { useTheme } from '@/providers/ThemeProvider';
import hexColors from '@/constants/hexColors';
import { Tabs } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { themeName } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: hexColors[themeName][colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          display: 'none' // Hide tab bar on this screen
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
