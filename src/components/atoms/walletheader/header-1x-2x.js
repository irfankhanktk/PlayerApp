import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Medium from 'typography/medium-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import {SearchInput} from '../inputs';
import {Row} from '../row';
import {PrimaryButton} from 'components/atoms/buttons';
import {t} from 'i18next';

const HeaderX = ({
  style = {},
  title,
  back = false,
  onChangeText = t => {},
  isSearch,
  placeholder = 'Search here',
  wallettext = '',
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.container, style]}>
        <Row style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Icon
              name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
              size={mvs(20)}
              color={colors.white}
            />
          </TouchableOpacity>
          <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
          <View style={styles.empty} />
        </Row>
        <View style={styles.wallettext}>
          <Medium
            fontSize={mvs(20)}
            label={wallettext}
            style={[styles.titlewallet]}
          />
        </View>
        {isSearch && (
          <SearchInput onChangeText={onChangeText} placeholder={placeholder} />
        )}
      </View>
    </>
  );
};
export default React.memo(HeaderX);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,

    paddingHorizontal: mvs(22),
    borderBottomLeftRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
    paddingVertical: mvs(15),
    paddingBottom: mvs(30),
    // borderWidth: 1,
  },
  empty: {
    width: mvs(10),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
  },
  back: {},
  wallettext: {
    alignSelf: 'center',

    padding: mvs(10),
  },
  titlewallet: {
    marginTop: mvs(10),
    fontSize: mvs(40),
    color: colors.white,
  },
});
