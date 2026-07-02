import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

export default function DocumentScreen() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchDocuments = async (query = '') => {
    try {
      setLoading(true);
      // Determine API URL depending on platform
      const baseUrl = 'http://10.0.2.2:8000'; // For Android emulator
      const response = await fetch(`${baseUrl}/api/v1/documents/search?q=${query}`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      // Fallback for demo if backend is not reachable from emulator
      setDocuments([
         { id: '1', document_number: 'DOC-MOCK-001', title: 'Pump Maintenance Manual', status: 'INDEXED', created_at: new Date().toISOString() },
         { id: '2', document_number: 'DOC-MOCK-002', title: 'API-610 Specification', status: 'DRAFT', created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enterprise DMS</Text>
        <Text style={styles.headerSubtitle}>Unified Backend Repository</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          placeholderTextColor="#71717a"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchDocuments(search)}
        />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#06b6d4" style={{ marginTop: 40 }} />
        ) : (
          documents.map((doc: any) => (
            <TouchableOpacity key={doc.id} style={styles.docCard}>
              <View style={styles.docHeader}>
                <Text style={styles.docNumber}>{doc.document_number}</Text>
                <View style={[styles.statusBadge, { backgroundColor: doc.status === 'INDEXED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)' }]}>
                  <Text style={[styles.statusText, { color: doc.status === 'INDEXED' ? '#10b981' : '#f59e0b' }]}>
                    {doc.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docDate}>Added: {new Date(doc.created_at).toLocaleDateString()}</Text>
            </TouchableOpacity>
          ))
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#06b6d4',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  searchInput: {
    backgroundColor: '#18181b',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 12,
  },
  docCard: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  docNumber: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  docTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  docDate: {
    color: '#71717a',
    fontSize: 12,
  }
});
