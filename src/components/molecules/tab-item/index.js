import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const TabItem = ({
  // children,
  style,
  onPress,
  title = "TITLE",
  ...props
}) => {
  return (
    <TouchableOpacity
      style={styles.itemtabs}
      onPress={onPress}>
      {props?.children}
      <Regular
        style={styles.itemText1}
        label={`${t(title)}`}
      />
    </TouchableOpacity>
  )
}
export default React.memo(TabItem);
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
  ,
  itemtabs: {
    marginBottom: mvs(15),

    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
    borderRadius: mvs(10),
    padding: mvs(10),
    backgroundColor: colors.white,
    // justifyContent: 'space-between',
    width: width - mvs(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  itemText: {
    fontSize: mvs(16),
    color: `${colors.black}`,
  },
  itemText1: {
    fontSize: mvs(16),
    color: `${colors.black}`,
    marginLeft: mvs(10),
  },

});