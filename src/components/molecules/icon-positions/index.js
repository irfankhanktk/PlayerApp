import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconPositions = ({ x, y, direction, children }) => {
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let fromValue = 0;
        let toValue = 0;

        switch (direction) {
            case 'top':
                fromValue = -200;
                break;
            case 'left':
                fromValue = -200;
                break;
            case 'bottom':
                fromValue = 200;
                break;
            case 'right':
                fromValue = 200;
                break;
            default:
                break;
        }

        animationValue.setValue(fromValue);
        Animated.spring(animationValue, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [animationValue, direction]);

    const getPositionStyle = () => {
        const translateX = animationValue.interpolate({
            inputRange: [-200, 0],
            outputRange: [x - 200, x],
        });

        const translateY = animationValue.interpolate({
            inputRange: [-200, 0],
            outputRange: [y - 200, y],
        });

        return { transform: [{ translateX }, { translateY }] };
    };

    return (
        // <View style={styles.container}>
        <Animated.View style={[styles.icon, getPositionStyle()]}>
            {children}
        </Animated.View>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    icon: {
        position: 'absolute',
    },
});

export default IconPositions;
