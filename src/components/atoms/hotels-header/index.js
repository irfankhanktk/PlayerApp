import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
const HotelsHeader = ({ style, title, isSearch, back, ...props }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${colors.primary}30`, `${colors.primary}70`, `${colors.primary}50`]}
        style={[styles.container, style]}
      >
        <Header1x2x title={title} back isSearch={isSearch} style={{ backgroundColor: colors.transparent, }} />
      </LinearGradient>
    </View>
  );
};
export default React.memo(HotelsHeader);
const styles = StyleSheet.create({
  container: {
    // height: mvs(200),
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
