import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyCard from "../components/CurrencyCard";
import HomeHeader from "../components/HomeHeader";
import Transactions from "../components/Transactions";
import imageCode from "../constants/ImageFlag";
import { getRequest } from "../api/apiCall";
import { AuthContext } from "../auth/AuthContext";

const Home = () => {
  const { accessToken, balances, setBalances } = useContext(AuthContext);
  const [totalBalance, setTotalBalance] = useState(0.0);

  const balancesData =
    Array.isArray(balances) &&
    balances.map((balance, index) => ({
      ...balance,
      id: index + 1,
      img: imageCode.get(balance.currency),
    }));

  useEffect(() => {
    getRequest(accessToken, "/balance")
      .then((response) => {
        setBalances(response);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (balances.length > 0) {
      const plnBalance = balances.find((item) => item.currency === "PLN");
      setTotalBalance(plnBalance.balance);
    }
  }, [balances]);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader balance={totalBalance} />

      <View style={styles.section}>
        <FlatList
          data={balancesData}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
          renderItem={({ item }) => (
            <View key={item.id}>
              <Link
                href={{
                  pathname: "/[exchange]",
                  params: { currency: item.currency, balance: item.balance },
                }}
                asChild>
                <TouchableOpacity>
                  <CurrencyCard
                    img={item.img}
                    currency={item.currency}
                    balance={item.balance}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          )}
        />
      </View>

      <Transactions />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
  },

  section: {
    marginBottom: 5,
    padding: 8,
  },
});
