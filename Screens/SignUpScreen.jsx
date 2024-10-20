// src/screens/SignUpScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@/config/api";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("regular"); // Default role is 'regular'
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    // Check if the email is valid
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (username === "") {
      Alert.alert("Error", "Fix the name field to continue");
      return;
    }

    // Create the payload
    const payloadToSave = {
      locationId: "Location123",
      email: email,
      password: password,
      username: username,
      organizationId: "Org123",
      partnerId: "Partner123",
      payrollId: "Payroll123",
      employerPayrollId: "EmployerPayroll123",
      accessRole: {
        name: "manager",
        permissions: [
          "LOCATION_READ",
          "SHIFT_READ",
          "SHIFT_WRITE",
          "SHIFT_ADD",
        ],
      },
      role: {
        name: role,
      },
    };

    try {
      // Make the POST request to the backend API for signup
      const response = await axios.post(
        BASE_URL + "/employees/create",
        payloadToSave
      );
      setLoading(true);
      // Handle success response
      if (response.status === 201) {
        Alert.alert(
          "Sign Up Successful",
          `Your account has been created as a ${role}.`,
          [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
        );
      }
    } catch (error) {
      // Handle error response
      console.error("Sign Up Error:", error);
      Alert.alert(
        "Sign Up Failed",
        "There was an error creating your account. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={setUserName}
        keyboardType="name-phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* Role Selection Dropdown */}
      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>
          {loading && "Loading"}
          {!loading && "Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#ff3479",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
