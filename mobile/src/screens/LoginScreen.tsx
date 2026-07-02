import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    // Simulate login API call
    router.replace('/dashboard');
  };

  const handleBiometricAuth = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert('Incompatible Device', 'Your device does not support biometric authentication.');
        return;
      }
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert('No Biometrics Found', 'Please set up Face ID or Touch ID on your device.');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access IndusBrain AI',
        fallbackLabel: 'Enter Password',
      });
      if (result.success) {
        router.replace('/dashboard');
      } else {
        Alert.alert('Authentication Failed', 'Biometric authentication was cancelled or failed.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.headerContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>IB</Text>
          </View>
          <Text style={styles.title}>IndusBrain AI</Text>
          <Text style={styles.subtitle}>Unified Asset & Operations Brain</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="engineer@indusbrain.ai"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricAuth}>
            <Text style={styles.biometricButtonText}>Face ID / Touch ID</Text>
          </TouchableOpacity>

          <View style={styles.ssoContainer}>
            <TouchableOpacity style={styles.ssoButton} onPress={() => Alert.alert('SSO', 'Keycloak Login')}>
              <Text style={styles.ssoButtonText}>Enterprise SSO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ssoButton} onPress={() => Alert.alert('SSO', 'Microsoft Login')}>
              <Text style={styles.ssoButtonText}>Microsoft</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b', // zinc-950
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: '#2563eb', // blue-600
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa', // zinc-400
  },
  formContainer: {
    backgroundColor: '#18181b', // zinc-900
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a', // zinc-800
  },
  label: {
    color: '#d4d4d8', // zinc-300
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#27272a',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#27272a',
  },
  dividerText: {
    color: '#71717a', // zinc-500
    paddingHorizontal: 12,
    fontSize: 14,
  },
  biometricButton: {
    backgroundColor: '#27272a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  biometricButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  ssoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ssoButton: {
    flex: 1,
    backgroundColor: '#27272a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  ssoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  }
});
