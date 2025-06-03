import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {(props) => <LoginScreen {...props} onLogin={login} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {(props) => <HomeScreen {...props} onLogout={logout} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
