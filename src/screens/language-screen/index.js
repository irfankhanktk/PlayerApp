import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {colors} from 'config/colors';
import {STORAGEKEYS} from 'config/constants';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Alert, I18nManager, View} from 'react-native';
import {setLanguage} from 'store/reducers/user-reducer';
import i18n from 'translation';
import {UTILS} from 'utils';
import styles from './styles';
import RNRestart from 'react-native-restart';
const LanguageScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const onChangeLanguage = (lang = 'en', rtl = false) => {
    try {
      Alert.alert(
        'Are you sure to change language ?',
        'App will restart once',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(setLanguage(lang));
              i18n.changeLanguage(lang);
              I18nManager.forceRTL(rtl);
              UTILS.setItem(STORAGEKEYS.lang, lang);
              RNRestart.restart();
            },
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('change_language')} />
      <View style={styles.body}>
        <PrimaryButton
          disabled={language === 'en'}
          onPress={() => onChangeLanguage('en', false)}
          textStyle={[
            styles.btnText,
            {color: language === 'en' ? colors.white : colors.black},
          ]}
          title={t('en')}
          containerStyle={[
            styles.lan,
            {
              backgroundColor:
                language === 'en' ? colors.primary : colors.secondary,
            },
          ]}
        />
        <PrimaryButton
          disabled={language === 'ar'}
          onPress={() => onChangeLanguage('ar', true)}
          textStyle={[
            styles.btnText,
            {color: language === 'ar' ? colors.white : colors.black},
          ]}
          title={t('ar')}
          containerStyle={[
            styles.lan,
            {
              backgroundColor:
                language === 'ar' ? colors.primary : colors.secondary,
            },
          ]}
        />
      </View>
    </View>
  );
};
export default LanguageScreen;
