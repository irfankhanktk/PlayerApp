import { Row } from 'components/atoms/row';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Icon from 'react-native-vector-icons/AntDesign';

const DoctorHospitalDetailsCard = ({
  item,
  style,
  onPress = () => { },
  onPressEdit = () => { },
  onPressDel = () => { },
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row>
        <Image source={{ uri: item?.banner_image_id }} style={{ height: mvs(120), width: mvs(120), borderRadius: mvs(15) }} />
        <View style={{ flex: 1, marginHorizontal: mvs(10), }}>
          <Medium style={styles.address} label={`${item?.title || 'Jinnah Hospital'}`} fontSize={mvs(16)} />
          <Row style={{ justifyContent: 'flex-start', }}>
            <Icon name={'enviroment'} color={colors.red} size={mvs(15)} />
            <Medium style={{
              fontSize: mvs(12),
              marginHorizontal: mvs(5)
            }} label={`${item?.address || 'Lahore Pakistan'}`} />
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(DoctorHospitalDetailsCard);
const styles = StyleSheet.create({
  container: {
    padding: mvs(13),
    borderRadius: mvs(10),
    marginHorizontal: mvs(20),
    marginTop: mvs(30),
    backgroundColor: colors.white,
    ...colors.shadow,
  },
  address: {},
  availableTime: { alignItems: 'center', },
  dot: {
    height: mvs(7),
    width: mvs(7),
    borderRadius: mvs(3.5),
    backgroundColor: colors.green,
    marginRight: mvs(6)
  }
});
