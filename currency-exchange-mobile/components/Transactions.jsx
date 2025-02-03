import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../auth/AuthContext";
import TransactionCard from "./TransactionCard";
import { getRequest } from "../api/apiCall";

const Transactions = () => {
  const { accessToken } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      getRequest(accessToken, "/transactions")
        .then((response) => {
          setTransactions(response);
        })
        .catch((err) => console.error(err));
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.transactionHeader}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionCard item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <Text style={{ textAlign: "center", padding: 16 }}>End of list</Text>
        }
      />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },

  transactionHeader: {
    margin: 10,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
});
