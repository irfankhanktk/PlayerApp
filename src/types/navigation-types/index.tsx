import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from "@react-navigation/stack";
import TabParamList from "./bottom-tab";
import RootStackParamList from "./root-stack";

export type NavigationProps=NativeStackScreenProps<RootStackParamList>;
