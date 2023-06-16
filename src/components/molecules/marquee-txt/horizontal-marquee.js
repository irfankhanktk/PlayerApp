import { colors } from 'config/colors';
import { height, mvs, width } from 'config/metrices';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Regular from 'typography/regular-text';

const HorizontalMarquee = ({ type = 'left', content = 'i am marquee' }) => {
  const animationValue = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    const translateY = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: -width,
          duration: type === 'left' ? 0 : 3000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: width,
          duration: type === 'left' ? 3000 : 0,
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
    <Animated.View style={[styles.icon, { transform: [{ translateX: animationValue }] }]}>
      <View style={{ width: width, paddingHorizontal: mvs(15), paddingBottom: mvs(20) }}>

        <Regular style={{ flex: 1 }}
          numberOfLines={3}
          color={colors.white}
          label={content} />
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

export default HorizontalMarquee;
