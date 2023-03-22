import {Row} from 'components/atoms/row';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import Icon from 'react-native-vector-icons/AntDesign';

const DoctorHospitalCard = ({
  item,
  style,
  onPress = () => {},
  onPressEdit = () => {},
  onPressDel = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row>
        <Image
          source={{uri: item?.banner_image_id}}
          style={{height: mvs(50), borderRadius: mvs(5), width: mvs(50)}}
        />
        <View style={{flex: 1, marginHorizontal: mvs(10)}}>
          <Row style={{flex: 1}}>
            <Medium
              style={styles.address}
              label={`${item?.title || 'Jinnah Hospital'}`}
              fontSize={mvs(16)}
            />
            <Row style={{}}>
              {/* <TouchableOpacity style={{ padding: mvs(3), marginHorizontal: mvs(10) }}>
                <Icon name={'delete'} color={colors.primary} size={mvs(15)} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={onPressEdit} style={{padding: mvs(3)}}>
                <Icon name={'edit'} color={colors.primary} size={mvs(15)} />
              </TouchableOpacity>
            </Row>
          </Row>
          <Row style={{justifyContent: 'flex-start'}}>
            <Icon name={'enviroment'} color={colors.red} size={mvs(15)} />
            <Medium
              style={{
                fontSize: mvs(12),
                marginHorizontal: mvs(5),
              }}
              label={`${item?.address || 'Lahore Pakistan'}`}
            />
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(DoctorHospitalCard);
const styles = StyleSheet.create({
  container: {
    padding: mvs(13),
    flex: 1,
    marginBottom: mvs(20),
    borderRadius: mvs(10),
    backgroundColor: colors.white,
    ...colors.shadow,
    // borderWidth: StyleSheet.hairlineWidth,
  },
  address: {flex: 1},
  availableTime: {alignItems: 'center'},
  dot: {
    height: mvs(7),
    width: mvs(7),
    borderRadius: mvs(3.5),
    backgroundColor: colors.green,
    marginRight: mvs(6),
  },
});
