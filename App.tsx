import { NavigationContainer } from '@react-navigation/native';
import { linking } from 'navigation/linking';
import { navigationRef } from 'navigation/navigation-ref';
import { RootNavigator } from 'navigation/root-navigation';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from 'store';
import 'translation';
import './src/config/axios-interceptor';
const App = () => {
  const [loading, setLoading] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | undefined>('Splash');

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef} linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
