import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getExchangeRate, postRequest } from "../api/apiCall";
import { AuthContext } from "../auth/AuthContext";

const SellCurrency = ({ balance, currency }) => {
  const router = useRouter();
  const { accessToken } = useContext(AuthContext);

  const [exchangeValue, setExchangeValue] = useState({
    currency,
    amountToSell: balance,
  });

  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState("0.0");

  const handleInput = (name, value) => {
    setExchangeValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getExchangeRate(exchangeValue.currency)
      .then((mid) => setExchangeRate(mid))
      .catch((err) => console.log(err));
  }, [exchangeValue.amountToSell]);

  useEffect(() => {
    const numericValue = parseFloat(exchangeValue.amountToSell);
    if (!isNaN(numericValue)) {
      const convertedAmount = (numericValue * exchangeRate).toFixed(2);
      setConvertedAmount(convertedAmount);
    } else {
      setConvertedAmount("0.00");
    }
  }, [exchangeValue.amountToSell, exchangeRate]);

  const handleExchange = () => {
       postRequest(accessToken, "/currency-exchange/sale", exchangeValue)
         .then((response) => {
           router.replace("/home");
         })
         .catch((err) => console.log(err));

  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder={"0.0"}
          autoCorrect={false}
          value={exchangeValue.amountToSell}
          onChangeText={(value) => handleInput("amountToSell", value)}
        />
        <Picker
          selectedValue={exchangeValue.currency}
          style={[styles.picker]}
          dropdownIconColor="#000">
          <Picker.Item
            label={exchangeValue.currency}
            value={exchangeValue.currency}
          />
        </Picker>
      </View>

      <View style={styles.field}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder={"0.0"}
          autoCorrect={false}
          editable={false}
          value={convertedAmount}
        />
        <Picker
          selectedValue={"PLN"}
          style={styles.picker}
          dropdownIconColor="#000">
          <Picker.Item label="PLN" value="PLN" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.exchangeBtn} onPress={handleExchange}>
        <Text style={styles.btnText}>Exchange</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SellCurrency;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    marginHorizontal: 18,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
  },

  field: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
  },

  exchangeBtn: {
    backgroundColor: "gold",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    width: 120,
    height: 50,
    color: "#000",
    backgroundColor: "#fafafa",
    fontSize: 16,
    paddingHorizontal: 8,
  },
});
