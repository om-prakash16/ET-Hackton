import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { Slot, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { ROLES, RoleId } from '@/config/roles';
import { Menu, X, Bell, User } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function WorkspaceLayout() {
  const { role } = useLocalSearchParams();
  const roleId = role as RoleId;
  const roleConfig = ROLES[roleId];
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(isDrawerOpen ? 0 : -DRAWER_WIDTH, { duration: 300 }) }]
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isDrawerOpen ? 1 : 0, { duration: 300 }),
      pointerEvents: isDrawerOpen ? 'auto' : 'none',
    } as any; // Ignore type mismatch for pointerEvents
  });

  if (!roleConfig) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-4">
        <Text className="text-danger font-bold text-xl mb-2">403 Unauthorized</Text>
        <Text className="text-muted-foreground text-center mb-6">Role &quot;{role}&quot; not found or unauthorized.</Text>
        <Pressable onPress={() => router.replace('/')} className="bg-primary px-6 py-3 rounded-lg">
          <Text className="text-white font-semibold">Return Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border bg-card z-10">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => setIsDrawerOpen(true)} className="p-2 rounded-md bg-muted">
            <Menu size={20} color="#94A3B8" />
          </Pressable>
          <View>
            <Text className="text-foreground font-bold text-base">IndusBrain AI</Text>
            <Text className="text-primary text-[10px] font-semibold uppercase">{roleConfig.name}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Pressable className="relative p-2">
            <Bell size={20} color="#94A3B8" />
            <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger border-2 border-card" />
          </Pressable>
          <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center border border-primary/30">
            <User size={16} color="#3B82F6" />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1">
        <Slot />
      </View>

      {/* Custom Drawer Overlay */}
      {isDrawerOpen && (
        <Animated.View 
          style={[overlayAnimatedStyle, { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 40 }]}
        >
          <Pressable className="flex-1" onPress={() => setIsDrawerOpen(false)} />
        </Animated.View>
      )}

      {/* Custom Drawer Sidebar */}
      <Animated.View 
        className="absolute top-0 bottom-0 left-0 bg-sidebar border-r border-border z-50 flex-col"
        style={[{ width: DRAWER_WIDTH }, drawerAnimatedStyle]}
      >
        <View className="flex-row items-center justify-between p-4 border-b border-border">
          <Text className="text-foreground font-bold text-lg">{roleConfig.name}</Text>
          <Pressable onPress={() => setIsDrawerOpen(false)} className="p-2 rounded-md hover:bg-muted">
            <X size={20} color="#94A3B8" />
          </Pressable>
        </View>

        <View className="flex-1 py-4">
          <Text className="px-4 text-xs font-bold text-muted-foreground uppercase mb-2 tracking-wider">Modules</Text>
          {roleConfig.navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Pressable 
                key={index}
                onPress={() => {
                  setIsDrawerOpen(false);
                  router.push(item.href as any);
                }}
                className={`flex-row items-center px-4 py-3 mx-2 my-0.5 rounded-lg ${isActive ? 'bg-primary/20' : ''}`}
              >
                <Icon size={18} color={isActive ? '#3B82F6' : '#94A3B8'} />
                <Text className={`ml-3 text-sm flex-1 ${isActive ? 'text-primary font-bold' : 'text-foreground'}`}>
                  {item.label}
                </Text>
                {item.badge && (
                  <View className={`px-2 py-0.5 rounded ${item.badgeType === 'warning' ? 'bg-warning/20' : 'bg-secondary'}`}>
                    <Text className={`text-[10px] font-bold ${item.badgeType === 'warning' ? 'text-warning' : 'text-muted-foreground'}`}>{item.badge}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}
