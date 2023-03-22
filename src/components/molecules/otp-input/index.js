import { colors } from 'config/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { mvs } from '../../../config/metrices';

const CELL_COUNT = 6;

export const OtpInput = ({ value, setValue }) => {
    // const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={txt => {
                setValue(txt)
                // propsParent.code(txt)
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[{ marginHorizontal: mvs(5) }, styles.cellRoot, isFocused && styles.focusCell,]}>
                    <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
            )}
        />
    );
};

export const styles = StyleSheet.create({
    // root: {},
    // title: { textAlign: 'center', fontSize: 30 },
    // // codeFieldRoot: {marginTop: 20},
    // cell: {
    //   width: WP(6),
    //   height: HP(4),
    //   //   lineHeight: 3,
    //   fontSize: fontSize.font20,
    //   fontFamily: 'Poppins-SemiBold',
    //   borderBottomWidth: 2,
    //   borderColor: palette.baseLine,
    //   textAlign: 'center',
    // },
    // focusCell: {
    //   borderColor: palette.blue,
    // },
    root: {},
    title: {
        textAlign: 'center', fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    codeFieldRoot: {
        // marginTop: 20,
        // width: 280,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        alignItems: 'center',
    },
    cellRoot: {
        width: mvs(40),
        height: mvs(54),
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: mvs(10)
    },
    cellText: {
        color: colors.primary,
        fontSize: mvs(20),
        textAlign: 'center',
    },
    focusCell: {
        borderColor: colors.primary,
        borderBottomWidth: 2,
    },
});