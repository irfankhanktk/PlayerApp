import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Medium from 'typography/medium-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const DateSlotPicker = ({
  dates = [],
  selectedIndex = 0,
  onChangeSlot = (index) => { },
  style,
  onPress
}) => {
  return (
    <View style={{ marginTop: mvs(20) }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: mvs(10) }} horizontal showsHorizontalScrollIndicator={false}>
        {dates?.map((item, index) => {
          const bool = index === selectedIndex;
          return (
            <TouchableOpacity key={index} onPress={() => { onChangeSlot(index) }}
              style={[styles.container,
              { backgroundColor: bool ? colors.primary : colors.blueHalf }]}>
              <Medium label={item?.day} color={bool ? colors.white : colors.primary} />
              <Medium label={item?.date} color={bool ? colors.white : colors.primary} />
            </TouchableOpacity>)
        })}
      </ScrollView>
    </View>
  );
};
export default React.memo(DateSlotPicker);
const styles = StyleSheet.create({
  container: {
    height: mvs(118),
    width: mvs(123),
    borderWidth: StyleSheet.hairlineWidth,
    padding: mvs(10),
    borderRadius: mvs(12),
    borderColor: colors.border,
    paddingVertical: mvs(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: mvs(10),
  },

});
