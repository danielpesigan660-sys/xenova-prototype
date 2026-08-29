import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { authService } from '@services/auth';

const RegisterScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.register(email, password, firstName, lastName, phone);
      Alert.alert('Success', 'Registration successful! Please verify your email.');
      navigation.navigate('OTPVerification', { email });
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10">
      <Text className="text-3xl font-bold mb-2 text-blue-600">XENOVA</Text>
      <Text className="text-xl font-semibold mb-6">Create Account</Text>

      <TextInput
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <TextInput
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <TextInput
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
        keyboardType="phone-pad"
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <TextInput
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
        className="border border-gray-300 rounded-lg p-4 mb-6"
        editable={!loading}
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        className="bg-blue-600 rounded-lg p-4 mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold text-lg">Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-center text-gray-600">
          Already have an account? <Text className="text-blue-600 font-semibold">Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
