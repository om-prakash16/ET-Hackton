import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import '../../global.css'; // NativeWind v4 requirement

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#070B14' } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="workspace/[role]" />
    </Stack>
  );
}
