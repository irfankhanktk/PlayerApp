import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import Medium from '../../../typography/medium-text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const PaymentMethodCard = ({
  disableWallet,
  selectedMethod = 'cash',
  onChange = method => {},
  style,
  onPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Row>
        <Medium
          label={'Payment Method'}
          color={colors.black}
          fontSize={mvs(18)}
          style={styles.payment}
        />
      </Row>
      <View style={[styles.paymentContainer]}>
        <Row>
          <TouchableOpacity
            onPress={() => onChange('cash')}
            style={styles.cardContainer}>
            <Image source={IMG.cash} style={styles.cardImg} />
            {selectedMethod === 'cash' && (
              <View style={styles.tick}>
                <AntDesign name={'check'} color={colors.white} />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableWallet}
            onPress={() => onChange('wallet')}
            style={{...styles.cardContainer, marginHorizontal: mvs(5)}}>
            <FontAwesome5 name="wallet" size={mvs(40)} color={colors.primary} />
            {selectedMethod === 'wallet' && (
              <View style={styles.tick}>
                <AntDesign name={'check'} color={colors.white} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            onPress={() => onChange('card')}
            style={styles.cardContainer}>
            <Image source={IMG.master} style={styles.cardImg} />
            {selectedMethod === 'card' && (
              <View style={styles.tick}>
                <AntDesign name={'check'} color={colors.white} />
              </View>
            )}
          </TouchableOpacity>
        </Row>
      </View>
      <Medium
        label={'choose payment method'}
        color={colors.primary}
        style={{fontSize: mvs(13), marginTop: mvs(10)}}
      />
    </View>
  );
};
export default React.memo(PaymentMethodCard);
const styles = StyleSheet.create({
  container: {
    marginTop: mvs(30),
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(10),
    padding: mvs(15),
  },
  payment: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  cardImg: {
    height: mvs(50),
    width: mvs(70),
    marginHorizontal: mvs(5),
    borderRadius: mvs(5),
  },
  tick: {
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: mvs(35),
    padding: mvs(5),
    right: mvs(5),
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: mvs(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(5),
    // width: '45%',
    flex: 1,
  },
  paymentContainer: {
    marginTop: mvs(15),
  },
  img: {
    height: mvs(100),
    width: mvs(100),
    borderTopRightRadius: mvs(10),
    borderTopLeftRadius: mvs(10),
  },
  profile: {
    marginHorizontal: mvs(10),
    flex: 1,
    // justifyContent: 'center'
  },
  title: {justifyContent: 'center', textAlign: 'center'},
  heart: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});
