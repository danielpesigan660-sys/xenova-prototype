import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setPortfolio, setInvestments } from '@store/portfolioSlice';
import { apiClient } from '@services/api';

const PortfolioScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { portfolio, investments, isLoading } = useSelector((state: RootState) => state.portfolio);
  const { user } = useSelector((state: RootState) => state.auth);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const portfolioResponse = await apiClient.getPortfolio();
      const investmentsResponse = await apiClient.getInvestments();

      dispatch(setPortfolio(portfolioResponse.data.portfolio));
      dispatch(setInvestments(investmentsResponse.data.investments));
      setBalance(portfolioResponse.data.balance);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const renderPortfolioItem = ({ item }: any) => (
    <View className="bg-gray-50 p-4 rounded-lg mb-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="font-semibold text-lg">{item.investment.name}</Text>
          <Text className="text-gray-600 text-sm">{item.quantity} units @ ₱{item.purchasePrice}</Text>
        </View>
        <View className="items-end">
          <Text className="font-bold text-lg">₱{item.currentValue.toLocaleString()}</Text>
          <Text className={`text-sm font-semibold ${item.gainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.gainPercent >= 0 ? '+' : ''}{item.gainPercent.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-blue-600 text-white p-6 pb-8">
        <Text className="text-white text-lg mb-2">Hello, {user?.firstName} 👋</Text>
        <Text className="text-gray-200 text-sm mb-4">Your Portfolio Balance</Text>
        <Text className="text-4xl font-bold text-white mb-2">₱{balance.toLocaleString()}</Text>
        <Text className="text-blue-200 text-sm">
          {portfolio?.gainPercent >= 0 ? '+' : ''}{portfolio?.gainPercent.toFixed(2)}% this month
        </Text>
      </View>

      <View className="flex-row px-4 pt-6 pb-4 gap-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Deposit')}
          className="flex-1 bg-green-600 rounded-lg p-4"
        >
          <Text className="text-white font-semibold text-center">Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-orange-600 rounded-lg p-4">
          <Text className="text-white font-semibold text-center">Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-blue-600 rounded-lg p-4">
          <Text className="text-white font-semibold text-center">Invest</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4">
        <Text className="text-lg font-bold mb-4">Your Investments</Text>
        {portfolio?.items && portfolio.items.length > 0 ? (
          <FlatList
            data={portfolio.items}
            renderItem={renderPortfolioItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <Text className="text-center text-gray-600 py-8">No investments yet. Start investing today!</Text>
        )}
      </View>

      <View className="px-4 pt-8 pb-10">
        <Text className="text-lg font-bold mb-4">Available Investments</Text>
        <FlatList
          data={investments.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-gray-50 p-4 rounded-lg mb-3 flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">{item.name}</Text>
                <Text className="text-gray-600 text-sm">₱{item.currentPrice.toLocaleString()}</Text>
              </View>
              <Text className={`font-bold ${item.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.changePercent24h >= 0 ? '+' : ''}{item.changePercent24h.toFixed(2)}%
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default PortfolioScreen;
