import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';

export default function CopilotScreen() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', text: 'AI Investigation OS active. Connected to Neo4j graph. How can I assist with Visakhapatnam operations?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // 10.0.2.2 is standard for Android Emulator to host machine. For iOS it's localhost.
      // We will use 10.0.2.2 assuming Android emulation by default, or localhost for local testing.
      const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';
      const response = await fetch(`${baseUrl}/api/v1/copilot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg, history: [] })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      
      let finalResponse = data.answer;
      if (data.citations && data.citations.length > 0) {
        const citations = data.citations.map((c: any) => c.document_id).join(', ');
        finalResponse += `\n\n[Sources: ${citations}]`;
      }
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: finalResponse }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: 'Error connecting to GraphRAG engine.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GraphRAG Copilot</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>NEO4J CONNECTED</Text></View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatArea} 
          contentContainerStyle={{ padding: 16 }}
        >
          {messages.map(msg => (
            <View key={msg.id} style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
          {isLoading && (
            <View style={[styles.messageBubble, styles.botBubble, { width: 60, alignItems: 'center' }]}>
              <ActivityIndicator color="#06b6d4" size="small" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about P-101A status..."
            placeholderTextColor="#71717a"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={isLoading || !input.trim()}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  keyboardView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    backgroundColor: '#18181b',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  badge: { backgroundColor: 'rgba(6, 182, 212, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: '#06b6d4' },
  badgeText: { color: '#06b6d4', fontSize: 10, fontWeight: 'bold' },
  chatArea: { flex: 1 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 12, marginBottom: 12 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#2563eb', borderBottomRightRadius: 2 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#27272a', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: '#3f3f46' },
  messageText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  inputArea: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#18181b',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#09090b',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#3f3f46',
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#06b6d4',
  },
  sendIcon: { color: '#06b6d4', fontSize: 18 },
});
