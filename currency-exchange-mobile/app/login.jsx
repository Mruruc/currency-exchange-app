import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { login } from "../api/apiCall";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const { setAccessToken } = useContext(AuthContext);

  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "john_doe@doe.com",
    password: "john_Pa233324).34242",
  });

  const handleInput = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    const { email, password } = credentials;

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    login({ email, password })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          setAccessToken(response.token);
          router.push("/home");
        } else {
        
          Alert.alert("Invalid credentials!");
        }
      })
      .catch(() => {
        Alert.alert("Error", "An error occurred during signup.");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={credentials.email}
          onChangeText={(value) => handleInput("email", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={credentials.password}
          onChangeText={(value) => handleInput("password", value)}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 80,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  loginBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#1E90FF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
  },
});
