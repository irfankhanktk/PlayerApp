import React, { useState } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';

const MoveableView = () => {
    const [height, setHeight] = useState(new Animated.Value(50));
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return gestureState.dy > 2 || gestureState.dy < -2;
        },
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dy < -10) {
                // Swiping up
                Animated.timing(height, {
                    toValue: 500,
                    duration: 200,
                    useNativeDriver: false,
                }).start();
            } else if (gestureState.dy > 10) {
                // Swiping down
                Animated.timing(height, {
                    toValue: 50,
                    duration: 200,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { height }]} {...panResponder.panHandlers} />
        </View>

    );
};
export default MoveableView;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    box: {
        width: '90%',
        backgroundColor: 'red',
    },
});

