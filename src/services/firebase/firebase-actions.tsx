import { Alert } from "react-native";
import { createUserWithEmailAndPassword, deleteDocument, logout, saveData, signInWithEmailAndPassword } from ".";
import { COLLECTIONS, STORAGEKEYS } from "../../config/constants";
import { AppDispatch, RootState } from "../../store";
import { reset, setUserInfo } from "../../store/reducers/user-reducer";
import { Task } from "../../types/entities-types";
import { UTILS } from "../../utils";
import { getData } from './index';

export const onLoginPress = (email: string, password: string, props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log('res of onLoginPress=>', res);
            const response = await getData('users', res?.user?.uid);
            UTILS.setItem(STORAGEKEYS.userId, res?.user?.uid);
            dispatch(setUserInfo(response));
            UTILS.resetStack(props, 'Home');

        } catch (error: any) {
            console.log('error in onLoginPress', error);
            Alert.alert('', UTILS.returnError(error),);
        }
    }
}
export const onSignupPress = (name: string, email: string, password: string, props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await createUserWithEmailAndPassword(name, email, password);
            console.log('res of onSignupPress=>', res);
            const user = {
                userId: res?.user?.uid,
                name: name,
                email: email,
            }
            await saveData('users', res?.user?.uid, user);
            UTILS.setItem(STORAGEKEYS.userId, res?.user?.uid);
            dispatch(setUserInfo(user));
            UTILS.resetStack(props, 'Home');
        } catch (error: any) {
            console.log('error in onSignupPress', error);
            Alert.alert('', error,);
        }
    }
}
export const onAddTaskPress = (task: Task, props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const userId = getState()?.user?.userInfo?.userId;
            const uuid = UTILS.getUUID();
            await saveData(COLLECTIONS.tasks, task?.id || uuid, { ...task, userId });
            console.log('TASK ADDED');

            props?.navigation?.goBack();
            Alert.alert('Your task is added')
        } catch (error: any) {
            console.log('error in onAddTaskPress', error);
            Alert.alert('', error,);
        }
    }
}
export const getUserData = (userId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(COLLECTIONS.users, userId);
            dispatch(setUserInfo(res));
        } catch (error: any) {
            console.log('error in getUserData', error);
            Alert.alert('', error,);
        }
    }
}
export const onLogoutPress = (props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            await logout();
            dispatch(reset);
            UTILS.resetStack(props, 'Login');
        } catch (error: any) {
            console.log('error in onDeleteTask', error);
            Alert.alert('', error,);
        }
    }
}
