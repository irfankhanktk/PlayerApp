import { colors } from 'config/colors';
import { height, mvs, width } from 'config/metrices';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Regular from 'typography/regular-text';

const IconPositions = ({ type = 'top' }) => {
  const animationValue = useRef(new Animated.Value(type === 'top' ? 0 : width)).current;

  useEffect(() => {
    const translateY = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: type === 'top' ? -height : -width,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: type === 'top' ? 0 : width,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    translateY.start();

    return () => {
      translateY.stop();
    };
  }, [animationValue]);

  return (
    // <View style={styles.container}>
    <Animated.View style={[styles.icon, { transform: [type === 'top' ? { translateY: animationValue } : { translateX: animationValue }] }]}>
      <View style={{ width: width, paddingHorizontal: mvs(15), paddingBottom: mvs(20) }}>

        <Regular style={{ flex: 1 }} numberOfLines={3} color={colors.white} label={'o achieve the desired animation of sliding the icon from all directions to the specified x and y position, you can modify here please'} />
      </View>
    </Animated.View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    position: 'absolute',
  },
});

export default IconPositions;
