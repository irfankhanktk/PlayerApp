import { colors } from 'config/colors';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Marquee = ({ content, delay = 1000, type }) => {
  const containerWidth = useRef(0);
  const contentWidth = useRef(0);
  const translateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (type === 'leftToRight' || type === 'rightToLeft') {
      // Calculate the total width of the content
      contentWidth.current = containerWidth.current + 2 * content.length;

      // Set the initial position of the content
      translateValue.setValue(type === 'leftToRight' ? -contentWidth.current : containerWidth.current);

      // Animate the content continuously
      Animated.loop(
        Animated.timing(translateValue, {
          toValue: type === 'leftToRight' ? containerWidth.current : -contentWidth.current,
          duration: delay,
          useNativeDriver: true,
        })
      ).start();
    } else if (type === 'topToBottom' || type === 'bottomToTop') {
      // Calculate the total height of the content
      contentWidth.current = containerWidth.current + 2 * content.length;

      // Set the initial position of the content
      translateValue.setValue(type === 'topToBottom' ? -contentWidth.current : containerWidth.current);

      // Animate the content continuously
      Animated.loop(
        Animated.timing(translateValue, {
          toValue: type === 'topToBottom' ? containerWidth.current : -contentWidth.current,
          duration: delay,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [content, type, translateValue]);

  const renderContent = () => {
    if (type === 'leftToRight' || type === 'rightToLeft') {
      return (
        <Animated.Text style={[styles.content, { transform: [{ translateX: translateValue }] }]}>
          {content}
        </Animated.Text>
      );
    } else if (type === 'topToBottom' || type === 'bottomToTop') {
      return (
        <Animated.Text style={[styles.content, { transform: [{ translateY: translateValue }] }]}>
          {content}
        </Animated.Text>
      );
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        containerWidth.current = event.nativeEvent.layout.width;
      }}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // overflow: 'hidden',
    // backgroundColor: 'red'
  },
  content: {
    fontSize: 16,
    color: colors.white,
  },
});

export default Marquee;
