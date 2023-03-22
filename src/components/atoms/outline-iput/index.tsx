import React, { useState, useRef } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import PhoneInput from 'react-native-phone-number-input';
import Regular from 'typography/regular-text';
import { mvs } from '../../../config/metrices';
import { colors } from '../../../config/colors';
import Medium from 'typography/medium-text';
import { Row } from '../row';
import { useAppSelector } from 'hooks/use-store';
type Item = { label: string; value: string };
import { TextInput } from 'react-native-paper';

type props = {
  onChangeText: (text: string) => void;
  onPress?: () => void;
  getCallingCode?: (text: string) => void | undefined;
  value?: string;
  label?: string;
  items?: Item[];
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean | undefined;
  ref?: React.LegacyRef<PhoneInput> | undefined;
  defaultCode?: 'PK';
  layout?: 'first';
  isPassword?: boolean;
  editable?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  onBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};
export const OutLineInput = (props: props) => {
  const [visible, setVisible] = React.useState(false);
  const {
    items = [],
    onChangeText,
    value,
    style,
    label = 'City',
    placeholder = 'type here',
    labelStyle,
    containerStyle,
    keyboardType,
    error,
  } = props;
  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        outlineStyle={styles.outLineStyle}
        placeholderTextColor={'#706561'}
        textColor={'#706561'}
      />
    </>
  );
};
export const HalfOutLineInput = (props: props) => {
  const [visible, setVisible] = React.useState(false);
  const {
    items = [],
    onChangeText,
    value,
    style,
    label = 'City',
    placeholder = 'type here',
    labelStyle,
    containerStyle,
    keyboardType,
    error,
  } = props;
  return (
    <View style={{ width: '48%' }}>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        outlineStyle={styles.halfOutLineStyle}
        placeholderTextColor={'#706561'}
        textColor={'#706561'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'flex-start',
    borderWidth: mvs(0.7),
    height: mvs(56),
    paddingTop: mvs(7),
    marginBottom: mvs(5),
    borderRadius: mvs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(10),
    backgroundColor: colors.secondary,
  },
  outLineStyle: {
    borderRadius: mvs(16),
    borderWidth: mvs(3),
    width: '100%',
    borderColor: colors.primary,
    // fontSize: mvs(18),
  },
  halfOutLineStyle: {
    borderRadius: mvs(16),
    borderWidth: mvs(3),
    borderColor: colors.primary,
  },
});
