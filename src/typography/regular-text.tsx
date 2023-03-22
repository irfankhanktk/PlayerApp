import React from 'react';
import { ColorValue, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import fonts from '../assets/fonts';
import { colors } from '../config/colors';
import { mvs } from '../config/metrices';
type FcProps = {
  label?: string | number;
  numberOfLines?: number;
  fontSize?: number;
  color?: ColorValue | undefined
  onPress?: (() => void) | undefined;
  style?: StyleProp<TextStyle>;
  children?: JSX.Element | JSX.Element[] | null
};
const Regular: React.FC<FcProps> = ({
  label,
  fontSize,
  color,
  numberOfLines,
  children,
  style,
  ...props
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      {...props}
      style={[{ ...styles.label, color: color, fontSize: fontSize, }, style]}>
      {label}
      {children}
    </Text>
  );
};

export default Regular;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    fontSize: mvs(15),
    color: colors.black, //default color
  },
});
