// In App.js in a new project
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from 'config/colors';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from 'screens/home-screen';
import Splash from 'screens/splash';
import { horizontalAnimation } from '../utils';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
