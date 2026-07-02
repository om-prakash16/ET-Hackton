import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ROLES, RoleId } from '@/config/roles';
import { Brain } from 'lucide-react-native';

export default function App() {
  const router = useRouter();
  
  return (
    <ScrollView className="flex-1 bg-background p-6" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="items-center mt-10 mb-8">
        <View className="w-16 h-16 rounded-2xl bg-primary/20 items-center justify-center border border-primary/30 mb-4">
          <Brain size={32} color="#3B82F6" />
        </View>
        <Text className="text-3xl font-bold text-foreground">IndusBrain <Text className="text-primary">AI</Text></Text>
        <Text className="text-sm text-muted-foreground mt-2 text-center">Mobile Field Client</Text>
      </View>

      <View className="bg-card p-4 rounded-xl border border-border mb-6">
        <Text className="text-sm text-warning font-semibold mb-1">Developer Mode</Text>
        <Text className="text-xs text-muted-foreground">Select a role below to simulate an authenticated user logging into the RBAC mobile workspace.</Text>
      </View>

      <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Available Roles</Text>
      
      <View className="flex-row flex-wrap gap-3">
        {Object.values(ROLES).map((role) => (
          <Pressable 
            key={role.id}
            onPress={() => router.push({ pathname: '/workspace/[role]/dashboard', params: { role: role.id } })}
            className="w-full bg-sidebar border border-border p-4 rounded-xl flex-row items-center justify-between active:bg-muted"
          >
            <View>
              <Text className="text-base font-bold text-foreground">{role.name}</Text>
              <Text className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wider">{role.id}</Text>
            </View>
            <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
              <Text className="text-primary font-bold text-xs">Login</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
