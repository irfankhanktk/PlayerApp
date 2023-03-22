import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import Bold from '../../../typography/bold-text';
import {login_bg} from 'assets/images';
import {Row} from '../row';
import {SearchInput} from '../inputs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigate} from 'navigation/navigation-ref';
import Regular from 'typography/regular-text';
type props = {
  style?: StyleProp<TextStyle>;
  title?: string;
  unreadNotification?: number;
  back?: boolean;
};
const AppHeader = ({
  style,
  title,
  unreadNotification,
  back,
  ...props
}: props) => {
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center'}}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={login_bg}
            style={{height: mvs(40), width: mvs(40), borderRadius: mvs(69 / 2)}}
          />
          <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
        </Row>
        <TouchableOpacity onPress={() => navigate('Notifications')}>
          <Ionicons
            name="notifications-sharp"
            size={mvs(25)}
            color={colors.white}
            style={{marginVertical: mvs(12)}}
          />
          {unreadNotification ? (
            <View style={styles.notificationbadge}>
              <Regular
                label={unreadNotification}
                fontSize={mvs(10)}
                style={{lineHeight: mvs(14), color: colors.white}}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </Row>
    </View>
  );
};
export default React.memo(AppHeader);
const styles = StyleSheet.create({
  container: {
    height: mvs(120),
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    borderBottomLeftRadius: mvs(40),
    borderBottomRightRadius: mvs(40),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
    marginVertical: mvs(12),
    marginHorizontal: mvs(12),
  },
  back: {
    marginRight: mvs(20),
  },
  notificationbadge: {
    backgroundColor: colors.red,
    // borderWidth: 1,
    borderColor: colors.white,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: mvs(6),
    right: mvs(-3),
    // padding: mvs(3),
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(15),
    width: mvs(15),
    borderRadius: mvs(7.5),
  },
});
