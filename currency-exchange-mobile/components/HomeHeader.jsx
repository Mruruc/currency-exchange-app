import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import AddMoneyModel from "./AddMoneyModel";
import { AuthContext } from "../auth/AuthContext";
import { postRequest } from "../api/apiCall";
import NewCurrencyAccountModel from "./NewCurrencyAccountModel";

const HomeHeader = ({ balance }) => {
  const { accessToken, balances, setBalances } = useContext(AuthContext);
  const [modelVisible, setModelVisible] = useState(false);
  const [accountModelVisible, setAccountModelVisible] = useState(false);

  const handleAddMoney = (amount) => {
    postRequest(accessToken, "/balance/deposit", {
      currency: "PLN",
      amount,
    }).then((response) => {
      setBalances((prevBalances) => {
        return prevBalances.map((bal) =>
          bal.currency === "PLN"
            ? { ...bal, balance: bal.balance + amount }
            : bal
        );
      });
    });
  };

  const handleNewCurrencyAccount = (currency) => {
    postRequest(accessToken, `/balance/create-account/${currency}`, null).then(
      (response) => {
        setBalances((prev) => [...prev, { currency, balance: 0 }]);
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <View style={styles.balance}>
          <Text style={styles.balanceText}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{balance} PLN</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setAccountModelVisible(true)}>
          <FontAwesome name="arrow-up" size={16} color="white" />
          <Text style={styles.btnText}>New Account</Text>
        </TouchableOpacity>

        <NewCurrencyAccountModel
          visible={accountModelVisible}
          onClose={() => setAccountModelVisible(false)}
          onSubmit={handleNewCurrencyAccount}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModelVisible(true)}>
          <MaterialIcons name="add" size={16} color="white" />
          <Text style={styles.btnText}>Add Money</Text>
        </TouchableOpacity>

        <AddMoneyModel
          visible={modelVisible}
          onClose={() => setModelVisible(false)}
          onSubmit={handleAddMoney}
        />
      </View>
    </View>
  );
};
export default HomeHeader;
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 8,
  },
  nestedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  balance: {
    alignItems: "center",
  },

  balanceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  balanceAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginTop: 3,
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
