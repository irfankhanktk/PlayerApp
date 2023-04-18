import { StyleSheet } from 'react-native';
import { height, mvs } from '../../config/metrices';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: mvs(2),
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
  backgroundVideo: {
    height: 300,
    width: '100%'
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
