import { View, Text, StyleSheet, ActivityIndicator, ColorValue } from 'react-native'
import React from 'react'
import { colors } from '../../../config/colors'
type props = {
    size?: number | "small" | "large" | undefined
    color?: ColorValue | undefined
}
export const Loader = (props: props) => {
    const { size = 'small', color = colors.primary } = props;
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})