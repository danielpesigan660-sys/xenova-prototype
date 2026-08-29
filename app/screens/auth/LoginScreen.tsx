import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setTokens, setError } from '@store/authSlice';
import { authService } from '@services/auth';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { user, token, refreshToken } = await authService.login(email, password);
      dispatch(setUser(user));
      dispatch(setTokens({ token, refreshToken }));
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || 'Login failed'));
      Alert.alert('Login Failed', error.response?.data?.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 justify-center">
      <Text className="text-3xl font-bold mb-8 text-center text-blue-600">XENOVA</Text>
      <Text className="text-xl font-semibold mb-6 text-center">Welcome Back</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-lg p-4 mb-6"
        editable={!loading}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-blue-600 rounded-lg p-4 mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold text-lg">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className="text-center text-gray-600">
          Don't have an account? <Text className="text-blue-600 font-semibold">Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
