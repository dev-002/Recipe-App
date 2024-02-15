import { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ringPadding1 = useSharedValue();
  const ringPadding2 = useSharedValue();

  const navigation = useNavigation();

  useEffect(() => {
    ringPadding1.value = 0;
    ringPadding2.value = 0;
    setTimeout(
      () => (ringPadding1.value = withSpring(ringPadding1.value + hp(5))),
      100
    );
    setTimeout(
      () => (ringPadding2.value = withSpring(ringPadding2.value + hp(5.5))),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* Logo */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ringPadding2 }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ringPadding1 }}
        >
          <Image
            source={require("../../assets/images/Welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* Title */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white tracking-widest"
        >
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest"
        >
          Food Heals
        </Text>
      </View>
    </View>
  );
}
