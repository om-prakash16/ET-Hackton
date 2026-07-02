import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ROLES, RoleId } from '@/config/roles';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, ShieldAlert, FileText, Cpu, Camera, CheckCircle2 } from 'lucide-react-native';

export default function MobileDashboard() {
  const { role } = useLocalSearchParams();
  const roleId = role as RoleId;
  const roleConfig = ROLES[roleId];

  if (!roleConfig) return null;

  return (
    <ScrollView className="flex-1 bg-background p-4" showsVerticalScrollIndicator={false}>
      
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground tracking-tight">{roleConfig.name} Dashboard</Text>
        <Text className="text-sm text-muted-foreground mt-1">Mobile Field Overview</Text>
      </View>

      <View className="flex-col gap-4 pb-10">
        {roleConfig.widgets.map((widget, index) => {
          
          if (widget.type === 'kpi') {
            return (
              <Card key={index} className="flex-row items-center justify-between">
                <CardContent className="flex-1 p-4 pb-4 flex-row justify-between items-center">
                  <View>
                    <Text className="text-xs text-muted-foreground font-semibold uppercase">{widget.title}</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">{widget.data?.value}</Text>
                  </View>
                  <Activity size={24} color="#3B82F6" className="opacity-50" />
                </CardContent>
              </Card>
            );
          }

          if (widget.type === 'quick-actions') {
            return (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle>{widget.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-row flex-wrap gap-2 pt-0">
                  <View className="bg-muted p-3 rounded-lg flex-1 items-center justify-center border border-border">
                    <Camera size={20} color="#94A3B8" />
                    <Text className="text-xs text-muted-foreground mt-2 font-medium">Scan QR</Text>
                  </View>
                  <View className="bg-primary/10 p-3 rounded-lg flex-1 items-center justify-center border border-primary/20">
                    <Cpu size={20} color="#3B82F6" />
                    <Text className="text-xs text-primary mt-2 font-bold">Ask AI</Text>
                  </View>
                </CardContent>
              </Card>
            );
          }

          if (widget.type === 'ai-insight') {
            return (
              <Card key={index} className="border-primary/30 bg-primary/10">
                <CardContent className="p-4 flex-row gap-3">
                  <Cpu size={20} color="#3B82F6" className="mt-1" />
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-primary mb-1">{widget.title}</Text>
                    <Text className="text-xs text-foreground">AI predicts pump P-201 requires maintenance within 12 hours based on recent vibration telemetry.</Text>
                  </View>
                </CardContent>
              </Card>
            );
          }

          if (widget.type === 'activity-feed') {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{widget.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-col gap-3">
                  <View className="flex-row justify-between items-center bg-muted/50 p-3 rounded-lg">
                    <View className="flex-1">
                      <Text className="text-sm text-foreground">Valve Inspection</Text>
                      <Text className="text-[10px] text-muted-foreground mt-1">2 hours ago</Text>
                    </View>
                    <Badge variant="success">Done</Badge>
                  </View>
                  <View className="flex-row justify-between items-center bg-muted/50 p-3 rounded-lg">
                    <View className="flex-1">
                      <Text className="text-sm text-foreground">Pending Work Order #492</Text>
                      <Text className="text-[10px] text-muted-foreground mt-1">Assigned to you</Text>
                    </View>
                    <Badge variant="warning">Open</Badge>
                  </View>
                </CardContent>
              </Card>
            );
          }

          return null;
        })}
      </View>
    </ScrollView>
  );
}
