import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Animated from "react-native-reanimated";

export const CachedImages = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlol = await response.blob();
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlol);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.log("Error: ", error);
        setCachedSource({ uri });
      }
    };
    getCachedImage();
  }, []);

  return <Animated.Image source={cachedSource} {...props} />;
};
