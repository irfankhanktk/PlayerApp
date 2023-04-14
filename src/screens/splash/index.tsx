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
import Lottie from 'lottie-react-native';
import { DotLoading } from 'assets/lottie';
import { mvs } from 'config/metrices';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const { navigation } = props;

  React.useEffect(() => {
    (async () => {
      setTimeout(() => {
        navigation?.replace('Home');
      }, 2000);
    })()
  }, []);


  return (
    <View style={{ ...styles.container }}>
      <Lottie source={DotLoading} autoPlay loop style={{ height: mvs(200) }} />
    </View>
  );
};
export default Splash;
