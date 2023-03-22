import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { onLogoutPress } from 'services/api/api-actions';
import TabParamList from 'types/navigation-types/bottom-tab';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import i18n from '../../translation/index';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'UserTab'>,
  NativeStackScreenProps<RootStackParamList>
>;
const UserTab = (props: props) => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const dispatch = useAppDispatch();
  const { t } = i18n;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.img} />
        <Medium
          label={userInfo?.name || t('guest_mode')}
          style={styles.name}
        />
        <Regular
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          style={styles.email}
        />

        <View style={styles.linkContainer}>
          {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('UpdatePassword')}>
              <FontAwesome name="key" size={mvs(22)} color={colors.primary} />
              <Regular
                style={styles.itemText1}
                label={`${t('update_password')}`}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.itemtabs}
            onPress={() => props?.navigation?.navigate('LanguageScreen')}>
            <FontAwesome5 name="globe" size={mvs(22)} color={colors.primary} />
            <Regular
              style={styles.itemText1}
              label={`${t('choose_language')}`}
            />
          </TouchableOpacity>
          {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('UpdateProfile')}>
              <FontAwesome5
                name="user-edit"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('update_profile')}`}
              />
            </TouchableOpacity>
          )}
          {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('AvailabilityList')}>
              <Ionicons
                name="timer-outline"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('availabilities')}`}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',

              width: '100%',
              paddingBottom: mvs(60),
            }}>
            <TouchableOpacity
              style={styles.logouttab}
              onPress={() =>
                userInfo
                  ? dispatch(onLogoutPress(props))
                  : props?.navigation?.navigate('Login')
              }>
              <AntDesign
                name={`${userInfo ? 'logout' : 'login'}`}
                size={mvs(22)}
                color={colors.red}
              />
              <Regular
                style={styles.itemText1}
                label={`${t(userInfo ? 'logout' : 'login')}`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserTab;
