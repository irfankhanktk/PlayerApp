import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import AppointmentCard from 'components/molecules/appointment-card';
import {EmptyList} from 'components/molecules/empty-list';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React, {useEffect} from 'react';
import {FlatList, View, Img, TouchableOpacity, Image} from 'react-native';
import {
  getAppointmentsList,
  getNotifications,
  onReadNotifications,
  readNotifications,
} from 'services/api/api-actions';
import i18n from 'translation';
import styles from './styles';
import * as IMG from 'assets/images';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import {Row} from 'components/atoms/row';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const Notifications = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  // const loadNotifications = async () => {
  //   try {
  //     dispatch(getNotifications({ doctor_id: userInfo?.id }, setLoading, readNotifications));
  //   } catch (error) {
  //     console.log('error=>', error);
  //   }
  // };
  const readNotifications = async () => {
    try {
      const unreadNoti = notifications
        ?.filter(x => !x?.is_read)
        ?.map(x => x?.id);
      if (!unreadNoti?.length) return;
      await onReadNotifications({
        doctor_id: userInfo?.id,
        ids: unreadNoti,
      });
    } catch (error) {
      console.log('error=>', error);
    }
  };

  useEffect(() => {
    readNotifications();
  }, []);
  const renderAppointmentItem = ({item, index}) => (
    <View
      key={index}
      style={[
        styles.rendercontainer,
        {backgroundColor: item?.is_read ? colors.white : colors?.blueHalf},
      ]}>
      <Row style={{justifyContent: 'flex-start'}}>
        <Image
          source={IMG.notificationcardicon}
          style={styles.notificationicon}
        />
        <View style={styles.titleandtextview}>
          <Row>
            <Medium label={item.title} />
          </Row>
          <Regular label={item.text} numberOfLines={3} />
        </View>
      </Row>
      <Regular
        label={moment(item.created_at).format('DD MMM, YYYY  hh:mm a')}
        style={{alignSelf: 'flex-end'}}
        fontSize={mvs(12)}
        color={colors.primary}
      />
    </View>
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('notifications')} />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default Notifications;
