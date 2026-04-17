import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />      {/* Login */}
      <Stack.Screen name="register" />   {/* Register */}
      <Stack.Screen name="home" />       {/* Home */}
    </Stack>
  );
}