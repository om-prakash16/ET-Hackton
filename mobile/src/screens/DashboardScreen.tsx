import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Initial Mock KPI data
const initialKpis = [
  { id: "assets", title: "Total Assets", value: 1420, trend: "+12", status: "good" },
  { id: "critical", title: "Critical Eq.", value: 45, trend: "Stable", status: "warning" },
  { id: "P-101A", title: "P-101A Pressure", value: 120, trend: "Stable", status: "good" },
  { id: "ST-402", title: "ST-402 Pressure", value: 400, trend: "Stable", status: "good" }
];

const initialAlerts = [
  { id: '1', title: 'P-101A Mechanical Seal Degradation', priority: 'Critical', time: '4 hrs to failure', color: '#ef4444' },
];

export default function DashboardScreen() {
  const router = useRouter();
  
  const [kpis, setKpis] = useState(initialKpis);
  const [alerts, setAlerts] = useState(initialAlerts);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Determine WS URL depending on platform
    const baseUrl = 'ws://10.0.2.2:8000'; // For Android emulator
    const ws = new WebSocket(`${baseUrl}/api/v1/telemetry/ws`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'telemetry') {
        setKpis(prev => prev.map(kpi => {
          if (kpi.id === data.asset) {
            return {
              ...kpi,
              value: data.data.pressure,
              trend: 'Live',
              status: data.data.pressure > 300 ? 'warning' : 'good'
            };
          }
          return kpi;
        }));
      } else if (data.type === 'alert') {
        const newAlert = {
          id: Math.random().toString(),
          title: data.message,
          priority: data.severity,
          time: 'Just now',
          color: data.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    };
    
    wsRef.current = ws;
    return () => ws.close();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>Industrial Command Center</Text>
          <Text style={styles.headerTitle}>Visakhapatnam Plant</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* KPI Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </View>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, idx) => (
            <View key={idx} style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <Text style={styles.kpiTitle}>{kpi.title}</Text>
                <View style={[styles.kpiBadge, { backgroundColor: kpi.status === 'good' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)' }]}>
                  <Text style={[styles.kpiBadgeText, { color: kpi.status === 'good' ? '#10b981' : '#f59e0b' }]}>
                    {kpi.status}
                  </Text>
                </View>
              </View>
              <View style={styles.kpiFooter}>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={[styles.kpiTrend, { color: kpi.trend.startsWith('-') ? '#10b981' : '#f59e0b' }]}>
                  {kpi.trend}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* AI Briefing */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AI Triage Inbox</Text>
          <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>LIVE</Text></View>
        </View>
        <View style={styles.alertsContainer}>
          {alerts.map(alert => (
            <TouchableOpacity key={alert.id} style={[styles.alertCard, { borderLeftColor: alert.color, borderLeftWidth: 4 }]}>
              <View style={styles.alertHeader}>
                <Text style={[styles.alertPriority, { color: alert.color }]}>{alert.priority}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              <Text style={styles.alertTitle}>{alert.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionTitle}>Scan Manual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📸</Text>
            <Text style={styles.actionTitle}>Report Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/copilot')}>
            <Text style={styles.actionIcon}>🤖</Text>
            <Text style={styles.actionTitle}>Ask Copilot</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b', // zinc-950
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563eb', // blue-600
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  liveBadge: {
    marginLeft: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.1)', // cyan
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  liveBadgeText: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: 'bold',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  kpiCard: {
    width: '48%',
    backgroundColor: '#18181b', // zinc-900
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiTitle: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  kpiBadge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  kpiBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  kpiFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  kpiValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  kpiTrend: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertsContainer: {
    gap: 12,
  },
  alertCard: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertPriority: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  alertTime: {
    color: '#71717a',
    fontSize: 12,
  },
  alertTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '31%',
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    color: '#d4d4d8',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  }
});
