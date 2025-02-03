import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

const NewCurrencyAccountModel = ({ visible, onClose, onSubmit }) => {
  const [currency, setCurrency] = useState("EUR");

  const handleAdd = () => {
    onSubmit(currency);
    setCurrency("");
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
          <Text style={styles.modalTitle}>Create New Currency Account</Text>

          <View style={styles.field}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder={"Select Currency"}
              autoCorrect={false}
              editable={false}
              value={currency}
            />
            <Picker
              selectedValue={currency}
              onValueChange={(value) => setCurrency(value)}
              style={styles.picker}
              dropdownIconColor="#000">
              <Picker.Item label="PLN" value="PLN" />
              <Picker.Item label="EUR" value="EUR" />
              <Picker.Item label="USD" value="USD" />
            </Picker>
          </View>

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#ff5c5c" />
            <Button title="Create" onPress={handleAdd} color="#4CAF50" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NewCurrencyAccountModel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000AA",
    flex: 1,
    justifyContent: "space-around",
  },

  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 30,
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

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  input: {
    flex: 1,
    fontSize: 18,
  },

  picker: {
    width: 120,
    color: "#000",
    backgroundColor: "#fafafa",
    fontSize: 16,
    paddingHorizontal: 8,
  },
});
