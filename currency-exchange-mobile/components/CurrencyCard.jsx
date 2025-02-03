import { Image, StyleSheet, Text, View } from "react-native";
const CurrencyCard = ({ img, currency, balance }) => {
  return (
    <View style={styles.innerContainer}>

      <Image source={img} style={styles.flagImage} />
      <Text style={styles.currencyTxt}>{currency}</Text>
      <Text style={styles.balance}>Balance: {balance}</Text>

    </View>
  );
};

export default CurrencyCard;
const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    minWidth: 250,
  },

  flagImage: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
  },

  currencyTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
  },
  balance: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4CAF50",
    flexShrink: 1,
  },
});
