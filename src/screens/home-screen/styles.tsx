import { StyleSheet } from 'react-native';
import { height, mvs } from '../../config/metrices';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  widget: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(3),
    borderRadius: mvs(12),
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: colors.primary
  },
  search: {
    paddingHorizontal: mvs(20),
    marginTop: -30,
    marginBottom: mvs(10),
  },
  body: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(100)
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  servicesHeading: {
    marginHorizontal: mvs(20),
  },
  bgImg: {
    height: mvs(200),
    paddingHorizontal: mvs(25),
    paddingVertical: mvs(30),
  },
  backgroundVideo: {
    height: '100%',
    width: '100%'
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  image: {

  },
  videoView: {
    backgroundColor: colors.blueHalf,
    width: "100%",
    height: height,
    // minHeight: 300
  },
  marqueeView: {
    position: "absolute",
    bottom: mvs(50),
    right: mvs(50),
    left: mvs(50),
    backgroundColor: `${colors.black}60`
  }


});
export default styles;
