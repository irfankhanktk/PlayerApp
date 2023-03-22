import * as IMG from 'assets/images';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const Hospital = ({
  item,
  style,
  onPress = () => { }
}) => {
  return (

    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={item?.banner_image_id ? { uri: item?.banner_image_id } : IMG.ExperimentsChe} style={styles.img} />
      <View style={styles.bottom}>
        <Regular label={item?.title} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(Hospital);
const styles = StyleSheet.create({
  container: {
    width: mvs(216),
    overflow: 'hidden',
    height: mvs(139),
    marginRight: mvs(10),
    borderRadius: mvs(12)
  },
  img: {
    height: '100%',
    width: '100%'
  },
  title: { fontSize: mvs(13) },
  bottom: { height: mvs(52), paddingHorizontal: mvs(16), justifyContent: 'center', backgroundColor: `${colors.black}86`, width: '100%', position: 'absolute', bottom: 0 }

});