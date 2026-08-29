import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setTokens } from '@store/authSlice';
import { authService } from '@services/auth';

const OTPVerification = ({ route, navigation }: any) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { email } = route.params;

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const { user, token, refreshToken } = await authService.verifyOTP(email, otp);
      dispatch(setUser(user));
      dispatch(setTokens({ token, refreshToken }));
      Alert.alert('Success', 'Email verified successfully!');
    } catch (error: any) {
      Alert.alert('Verification Failed', error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 justify-center">
      <Text className="text-3xl font-bold mb-2 text-blue-600">XENOVA</Text>
      <Text className="text-xl font-semibold mb-2">Verify Email</Text>
      <Text className="text-gray-600 mb-6">We sent an OTP to {email}</Text>

      <TextInput
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        className="border border-gray-300 rounded-lg p-4 mb-6 text-center text-2xl tracking-widest"
        editable={!loading}
      />

      <TouchableOpacity
        onPress={handleVerify}
        disabled={loading}
        className="bg-blue-600 rounded-lg p-4 mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold text-lg">Verify</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-center text-gray-600">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerification;
