import { PrimaryButton } from 'components/atoms/buttons';
import { Row } from 'components/atoms/row';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Medium from 'typography/medium-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const TimeSlotPicker = ({
  label = 'Available Slots',
  items = [],
  formatArray = [],
  selectedSlotTimeId,
  onChangeSlotTime = (id) => { },
  style,
  onPress
}) => {
  return (
    <View style={{ paddingHorizontal: mvs(20), marginTop: mvs(20) }}>
      <Medium label={label} fontSize={mvs(20)} />
      <Row style={{ flexWrap: 'wrap', }}>
        {items?.map((item, index) => {
          const bool = selectedSlotTimeId === item?.id;
          return (
            <PrimaryButton
              onPress={() => onChangeSlotTime(item?.id)}
              key={index} title={`${formatArray[item?.start_time_id]}-${formatArray[item?.end_time_id]}`}
              containerStyle={[styles.btn, {
                backgroundColor: bool ? colors.primary : colors.blueHalf,
              }]}
              textStyle={{ color: bool ? colors.white : colors.primary }}
            />
          )
        })}
      </Row>
    </View>
  );
};
export default React.memo(TimeSlotPicker);
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
    // marginHorizontal: mvs(10),
  },
  btn: {
    height: mvs(46),
    width: mvs(100),
    borderRadius: mvs(10),
    marginBottom: mvs(10),

  }

});
