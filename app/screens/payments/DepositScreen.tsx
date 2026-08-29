import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTransaction } from '@store/paymentSlice';
import { paymentService } from '@services/payment';

const DepositScreen = ({ navigation }: any) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'gcash' | 'maya' | null>(null);
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const paymentMethods = await paymentService.getPaymentMethods();
      setMethods(paymentMethods);
    } catch (error) {
      Alert.alert('Error', 'Failed to load payment methods');
    }
  };

  const handleDeposit = async () => {
    if (!amount || !selectedMethod) {
      Alert.alert('Error', 'Please enter amount and select payment method');
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const transaction = await paymentService.initiateDeposit(depositAmount, selectedMethod);
      dispatch(addTransaction(transaction));
      Alert.alert('Success', 'Deposit initiated! Awaiting payment confirmation.');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-blue-600 text-white px-6 py-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-white text-lg mb-4">← Back</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-white mb-2">Deposit Funds</Text>
        <Text className="text-blue-200">Add money to your investment account</Text>
      </View>

      <View className="px-6 py-8">
        <Text className="text-lg font-semibold mb-4">Amount</Text>
        <View className="flex-row items-center mb-6">
          <Text className="text-3xl font-bold text-gray-800 mr-2">₱</Text>
          <TextInput
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            className="flex-1 text-3xl font-bold border-b-2 border-blue-600 pb-2"
          />
        </View>

        <Text className="text-sm text-gray-600 mb-3">Quick amounts:</Text>
        <View className="flex-row gap-3 mb-8">
          {[1000, 5000, 10000, 50000].map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              onPress={() => handleQuickAmount(quickAmount)}
              className="flex-1 border border-blue-600 rounded-lg p-3"
            >
              <Text className="text-center text-blue-600 font-semibold">₱{(quickAmount / 1000).toFixed(0)}k</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-semibold mb-4">Payment Method</Text>
        <FlatList
          data={methods}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedMethod(item.method)}
              className={`p-4 rounded-lg mb-3 flex-row items-center justify-between ${
                selectedMethod === item.method ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-50 border-2 border-gray-300'
              }`}
            >
              <View>
                <Text className="font-semibold text-lg capitalize">{item.method}</Text>
                <Text className="text-gray-600 text-sm">Fee: ₱{item.fee}</Text>
              </View>
              <View className={`w-6 h-6 rounded-full border-2 ${selectedMethod === item.method ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        <TouchableOpacity
          onPress={handleDeposit}
          disabled={loading || !selectedMethod || !amount}
          className={`rounded-lg p-4 mt-6 ${loading || !selectedMethod || !amount ? 'bg-gray-400' : 'bg-green-600'}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">Deposit ₱{amount || '0.00'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DepositScreen;
