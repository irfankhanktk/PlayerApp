import React from 'react';
import {
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
type props = {
  style?: StyleProp<TextStyle>;
  title?: string;
  back?: boolean;
};
const AppHeader = ({style, title, back, ...props}: props) => {
  return (
    <View style={[styles.container, style]}>
      <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
    </View>
  );
};
export default React.memo(AppHeader);
const styles = StyleSheet.create({
  container: {
    height: mvs(200),
    position: 'absolute',
    width: '100%',
    top: 0,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    borderBottomLeftRadius: mvs(40),
    borderBottomRightRadius: mvs(40),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
    marginVertical: mvs(12),
  },
  back: {
    marginRight: mvs(20),
  },
});
