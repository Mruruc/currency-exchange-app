import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Button,
} from "react-native";

const AddMoneyModel = ({ visible, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    onSubmit(numericAmount);
    setAmount("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>

      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Money to Your Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#ff5c5c" />
            <Button title="Add" onPress={handleAdd} color="#4CAF50" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AddMoneyModel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000AA",
    flex:1,
    justifyContent:"space-around"
  },

  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal:25,
    paddingVertical:40,
    margin: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
