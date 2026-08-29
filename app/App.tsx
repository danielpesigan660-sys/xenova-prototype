import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from '@store/store';
import * as SecureStore from 'expo-secure-store';
import { setUser, setTokens } from '@store/authSlice';

// Screens
import LoginScreen from '@screens/auth/LoginScreen';
import RegisterScreen from '@screens/auth/RegisterScreen';
import OTPVerification from '@screens/auth/OTPVerification';
import PortfolioScreen from '@screens/portfolio/PortfolioScreen';
import DepositScreen from '@screens/payments/DepositScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (token && refreshToken) {
        dispatch(setTokens({ token, refreshToken }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // TODO: Add splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
          </>
        ) : (
          <>
            <Stack.Screen name="Portfolio" component={PortfolioScreen} />
            <Stack.Screen name="Deposit" component={DepositScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
