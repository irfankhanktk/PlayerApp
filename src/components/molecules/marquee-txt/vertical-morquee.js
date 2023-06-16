import { colors } from 'config/colors';
import { height, mvs, width } from 'config/metrices';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Regular from 'typography/regular-text';

const VerticalMarquee = ({ type = 'top', content = 'i am marquee' }) => {
  const animationValue = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    let arr = [

      Animated.timing(animationValue, {
        toValue: -height - 120,
        duration: type !== 'bottom' ? 0 : 4000,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 120,
        duration: type !== 'bottom' ? 4000 : 0,
        useNativeDriver: true,
      }),
    ]

    const translateY = Animated.loop(
      Animated.sequence(arr)
    );

    translateY.start();

    return () => {
      translateY.stop();
    };
  }, [animationValue]);

  return (
    <Animated.View style={[styles.icon, { transform: [{ translateY: animationValue }] }]}>
      <View style={{ width: width, paddingHorizontal: mvs(15), paddingBottom: mvs(20) }}>
        <Regular style={{ flex: 1 }}
          numberOfLines={3} color={colors.white}
          label={content} />
      </View>
    </Animated.View>
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

export default VerticalMarquee;
