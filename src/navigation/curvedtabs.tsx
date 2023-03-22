import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from 'config/colors';
import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from 'screens/home-screen';
import RootStackParamList from 'types/navigation-types/root-stack';
type props = NativeStackScreenProps<RootStackParamList, 'BottomTab'>;

export const TabBar = (props: props) => {
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'home';
        break;

      case 'title2':
        icon = 'wallet';
        break;
      case 'title3':
        icon = 'receipt';
        break;
      case 'title4':
        icon = 'ios-person-sharp';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? colors.primary : 'black'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }: { routeName: string, selectedTab: string, navigate: any }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBar.Navigator
        screenOptions={{ headerShown: false }}
        style={styles.bottomBar}
        // strokeWidth={0.5}
        // strokeColor="#DDDDDD"
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={() => navigate('WalletScreen')}>
              <Ionicons name={'wallet'} color="white" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="title1"
          position="LEFT"
          component={() => <Home {...props} />}
        />
        {/* <CurvedBottomBar.Screen
          name="title2"
          position="LEFT"
          component={() => <WalletScreen {...props} />}
        /> */}
        {/* <CurvedBottomBar.Screen
          name="title3"
          component={() => <AppointmentsList {...props} />}
          position="RIGHT"
        /> */}
        <CurvedBottomBar.Screen
          name="title4"
          component={() => <Home {...props} />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});
