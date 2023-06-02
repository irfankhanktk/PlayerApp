import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Regular from 'typography/regular-text';

const MarqueeVertically = () => {
  const [offset, setOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(offset => (offset > 300 ? 0 : offset + 1));
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleContentSizeChange = (width, height) => {
    setContentHeight(height);
  };

  const handleContainerLayout = event => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const contentStyle = {
    paddingRight: offset % contentHeight || 0,
  };

  return (
    <View style={{height: 300}} onLayout={handleContainerLayout}>
      <ScrollView
        contentContainerStyle={contentStyle}
        onContentSizeChange={handleContentSizeChange}>
        <Regular
          numberOfLines={1}
          style={{
            // flex: 1,
            width: 200,
            height: 200,
            // backgroundColor: 'blue',
            // transform: [{ rotate: '90deg' }],
          }}
          label={'Your marquee text goes here'}
        />
      </ScrollView>
    </View>
  );
};

export default MarqueeVertically;
