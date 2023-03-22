import { StyleSheet } from 'react-native';
import { mvs } from '../../config/metrices';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  bgImg:{
    height: mvs(200),
    paddingHorizontal: mvs(25),
    paddingVertical: mvs(30),
  }

});
export default styles;
