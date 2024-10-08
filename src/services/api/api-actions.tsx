import {Alert} from 'react-native';
import {getData, postData} from '.';
import {UTILS} from '../../utils';
import {URLS} from './api-urls';
export const syncTimeStamp = async (player_id: string) => {
  try {
    const res = await getData(`${URLS.sync_time_stamp}${player_id}`);
    // console.log('res of getHomeData=>', res);
    // dispatch(setHospitals(res?.allHospitals || []));
    // return res;
  } catch (error: any) {
    console.log('error in getHomeData', UTILS.returnError(error));
    // Alert.alert('', UTILS.returnError(error));
  }
};
export const getPlaylist = async (player_id: string) => {
  try {
    const res = await postData(`${URLS.playlist}`, {
      code: player_id,
    });
    // console.log('res of getPlaylist=>', res);
    // dispatch(setHospitals(res?.allHospitals || []));
    return res;
  } catch (error: any) {
    console.log('error in getHomeData', UTILS.returnError(error));
    if (UTILS.returnError(error) === 'Network Error') {
      // Alert.alert(
      //   'Network Error',
      //   'No internet connection; saved videos loaded from local cache.',
      // );
      // } else {
      // Alert.alert('', UTILS.returnError(error));
    }
  }
};
