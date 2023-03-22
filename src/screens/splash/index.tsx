import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SplashIcon } from 'assets/icons';
import { splash_bg } from 'assets/images';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import i18n from 'translation';
import { STORAGEKEYS } from '../../config/constants';
import { setLanguage, setUserInfo } from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import { UTILS } from '../../utils';
import { useAppDispatch } from './../../hooks/use-store';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
  }, [])
  React.useEffect(() => {

    (async () => {
      try {
        let screen: 'Login' | 'BottomTab' = 'Login';
        UTILS.getItem(STORAGEKEYS.lang).then((lang: any) => {
          i18n.changeLanguage(lang);
          dispatch(setLanguage(lang ?? 'en'));
        })

        UTILS.getItem(STORAGEKEYS.user).then((data: any) => {
          if (data) {
            const user = JSON.parse(data);
            screen = 'BottomTab';
            dispatch(setUserInfo(user));
          }
          setTimeout(() => {
            navigation?.replace(screen);
          }, 2000);
        });

      } catch (error) {

      }
    })()
  }, []);


  return (
    <View style={{ ...styles.container }}>
      <ImageBackground source={splash_bg} style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <SplashIcon />
      </ImageBackground>
    </View>
  );
};
export default Splash;
