import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { Tabs } from 'expo-router';
export default function SplashLayout() {
  return (
    <Tabs
      screenOptions={{
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
