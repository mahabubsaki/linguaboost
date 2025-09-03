import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AUTH_TEXT } from '@repo/static-text';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual sign-in logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      Alert.alert('Success', AUTH_TEXT.success.signInSuccess);

      router.push('/splash');
    } catch {
      Alert.alert('Error', AUTH_TEXT.errors.signInFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // TODO: Implement Google Sign-In
      Alert.alert('Info', 'Google Sign-In coming soon');
    } catch {
      Alert.alert('Error', AUTH_TEXT.errors.networkError);
    }
  };

  const navigateToSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <View className="flex-1 px-6">
      {/* Email Input */}
      <View className="mb-4">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4 py-4">
          <MaterialIcons name="email" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-700"
            placeholder={AUTH_TEXT.signIn.emailPlaceholder}
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="mb-4">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4 py-4">
          <MaterialIcons name="lock" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-700"
            placeholder={AUTH_TEXT.signIn.passwordPlaceholder}
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-2">
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity className="mb-6 self-end">
        <Text className="text-sm font-medium text-blue-500">{AUTH_TEXT.signIn.forgotPassword}</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        className={`mb-6 rounded-xl bg-blue-500 py-4 ${isLoading ? 'opacity-50' : ''}`}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text className="text-center text-lg font-semibold text-white">
          {isLoading ? 'Signing In...' : AUTH_TEXT.signIn.signInButton}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="mb-6 flex-row items-center">
        <View className="h-px flex-1 bg-gray-300" />
        <Text className="mx-4 text-sm text-gray-500">{AUTH_TEXT.common.orContinueWith}</Text>
        <View className="h-px flex-1 bg-gray-300" />
      </View>

      {/* Google Sign In */}
      <TouchableOpacity
        className="mb-6 flex-row items-center justify-center rounded-xl border border-gray-300 bg-white py-4"
        onPress={handleGoogleSignIn}
      >
        <MaterialIcons name="login" size={20} color="#4285F4" className="mr-2" />
        <Text className="ml-2 text-base font-medium text-gray-700">
          {AUTH_TEXT.common.googleSignIn}
        </Text>
      </TouchableOpacity>

      {/* Switch to Sign Up */}
      <TouchableOpacity onPress={navigateToSignUp} className="self-center">
        <Text className="text-sm text-gray-600">{AUTH_TEXT.signIn.switchToSignUp}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
