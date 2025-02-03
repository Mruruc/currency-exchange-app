import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";

const CurrencyExchangeApp = () => {
  const router = useRouter();

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/home-backslash.jpg")}>
      <Text style={styles.txtHeader}>
        Seamless Currency Exchange, Anytime, Anywhere!
      </Text>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/login")}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => router.push("/signup")}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
export default CurrencyExchangeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  txtHeader: {
    color: "#333333",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 70,
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },
  loginBtn: {
    backgroundColor: "rgb(34,176,80)",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginVertical: 8,
  },
  registerBtn: {
    backgroundColor: "rgb(0,122,255)",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginVertical: 2,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
