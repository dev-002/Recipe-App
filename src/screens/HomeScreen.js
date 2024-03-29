import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, Text, ScrollView, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import axios from "axios";
import Categories from "../components/Categories";
import Recipes from ".././components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Error: ", error?.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Error: ", error?.message);
    }
  };
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6 pt-12"
      >
        {/* Icons */}
        <View className="mx-4 flex-row justify-between item-center">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greetings */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2) }} className="text-neutral-600">
            Hello, Devansh
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="text-neutral-600 font-semibold"
          >
            Make your own food,
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="text-neutral-600 font-semibold"
          >
            stay at <Text className="text-amber-400"> home</Text>
          </Text>
        </View>

        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 px-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
