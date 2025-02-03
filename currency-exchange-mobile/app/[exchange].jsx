import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import BuyCurrency from "../components/BuyCurrency";
import SellCurrency from "../components/SellCurrency";

const ExchangeScreen = () => {
  const navigation = useNavigation();
  const { currency, balance } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ title: `Exchange - ${currency} ` });
  }, [currency]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Seamless Currency Exchange, Anytime, Anywhere!
      </Text>
      {currency === "PLN" ? (
        <BuyCurrency balance={balance} />
      ) : (
        <SellCurrency balance={balance} currency={currency} />
      )}
    </SafeAreaView>
  );
};

export default ExchangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 18,
    marginVertical: 30,
  },
});
