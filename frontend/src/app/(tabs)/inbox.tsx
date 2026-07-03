import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert, SafeAreaView, Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { StorageService, isManagerRole } from '../../services/storage';
import { Url, baseUrl as envBaseUrl } from '../../services/api';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Mic, Play, Square, Send, User, ChevronDown, MessageSquare } from 'lucide-react-native';

export default function InboxScreen() {
  const { colors, isDark } = useTheme();
  const [isManager, setIsManager] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [instructions, setInstructions] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const user = await StorageService.getCurrentUser();
      setCurrentUser(user);
      const isMgr = isManagerRole(user?.role || '');
      setIsManager(isMgr);
      
      await fetchInstructions();
      if (isMgr) {
        await fetchEmployees();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructions = async () => {
    try {
      const token = await StorageService.getToken();
      const res = await axios.get(Url.getInstructions, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInstructions(res.data);
    } catch (e) {
      console.error('Failed to fetch instructions', e);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = await StorageService.getToken();
      const res = await axios.get(Url.users, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter out only employees if needed, but here we just show all users
      setEmployees(res.data.filter((u: any) => !isManagerRole(u.role)));
    } catch (e) {
      console.error('Failed to fetch employees', e);
    }
  };

  const startRecording = async () => {
    if (isManager && !selectedEmployee) {
      Alert.alert('Select Employee', 'Please select an employee to send the instruction to.');
      return;
    }
    
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) { 
      console.error('Failed to start recording', err); 
      Alert.alert('Error', 'Could not start recording.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    uploadInstruction(uri);
  };

  const uploadInstruction = async (uri: string | null) => {
    if (!uri || !selectedEmployee) return;
    setUploading(true);
    try {
      const token = await StorageService.getToken();
      const formData = new FormData();
      formData.append('recipient_username', selectedEmployee);
      
      const fileExt = Platform.OS === 'web' ? 'webm' : 'm4a';
      const mimeType = Platform.OS === 'web' ? 'audio/webm' : 'audio/m4a';
      
      // On web, uri is usually a blob URL, but we need to fetch it to get a File object,
      // However, expo-av provides a file via getURI() that works with fetch/FormData if handled correctly.
      if (Platform.OS === 'web') {
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append('file', blob, `instruction.${fileExt}`);
      } else {
        formData.append('file', { uri, name: `instruction.${fileExt}`, type: mimeType } as any);
      }
      
      const baseUrlStr = process.env.EXPO_PUBLIC_API_URL || envBaseUrl || 'http://localhost:8000';
      await axios.post(`${baseUrlStr}/instructions/voice`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      await fetchInstructions();
      Alert.alert('Success', 'Instruction sent successfully!');
    } catch (e: any) { 
      console.error('Upload failed', e);
      Alert.alert('Upload Error', e.response?.data?.detail || 'Failed to upload instruction.');
    } finally {
      setUploading(false);
    }
  };

  const playVoice = async (url: string) => {
    try {
      const baseUrlStr = process.env.EXPO_PUBLIC_API_URL || envBaseUrl || 'http://localhost:8000';
      const fullUrl = `${baseUrlStr}${url}`;
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: fullUrl });
      setSound(newSound);
      await newSound.playAsync();
    } catch (e: any) { 
      console.error('Play failed', e); 
      if (Platform.OS === 'web' && e.message?.includes('NotSupportedError')) {
        Alert.alert('Browser Not Supported', 'Your web browser does not support playing this audio format (.m4a). Please test on a physical iOS/Android device via the Expo Go app!');
      } else {
        Alert.alert('Playback Error', 'Could not play the voice message.');
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1 p-5" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="mb-6 mt-4">
          <Text style={{ color: colors.text, fontFamily: 'Poppins_700Bold', fontSize: 24 }}>
            Direct Messages
          </Text>
          <Text style={{ color: colors.textSecondary, fontFamily: 'Inter_400Regular', fontSize: 14 }}>
            {isManager ? 'Send voice instructions to your team' : 'Voice instructions from management'}
          </Text>
        </View>

        {isManager && (
          <View 
            style={{ 
              backgroundColor: colors.card,
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(62,39,35,0.05)',
              borderWidth: 1 
            }}
            className="rounded-2xl p-4 mb-6"
          >
            <Text style={{ color: colors.text, fontFamily: 'Poppins_600SemiBold', fontSize: 14, marginBottom: 8 }}>
              New Instruction
            </Text>
            
            {/* Simple Employee Picker Placeholder - For a real app, use a proper Picker component */}
            <View className="flex-row flex-wrap mb-4">
              {employees.map((emp) => (
                <Pressable
                  key={emp.username}
                  onPress={() => setSelectedEmployee(emp.username)}
                  style={{ 
                    backgroundColor: selectedEmployee === emp.username ? colors.primary : colors.background,
                    borderColor: selectedEmployee === emp.username ? colors.primary : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                    borderWidth: 1
                  }}
                  className="px-3 py-1.5 rounded-full mr-2 mb-2"
                >
                  <Text style={{ 
                    color: selectedEmployee === emp.username ? '#FFF' : colors.text,
                    fontFamily: 'Inter_500Medium', 
                    fontSize: 12 
                  }}>
                    {emp.name} (@{emp.username})
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={recording ? stopRecording : startRecording}
              disabled={uploading || (!recording && !selectedEmployee)}
              style={{ backgroundColor: recording ? colors.danger : colors.primary, opacity: (!recording && !selectedEmployee) ? 0.5 : 1 }}
              className="flex-row items-center justify-center p-4 rounded-xl active:scale-95"
            >
              {recording ? (
                <Square size={20} color="#FFFFFF" className="mr-2" />
              ) : (
                <Mic size={20} color="#FFFFFF" className="mr-2" />
              )}
              <Text style={{ color: '#FFFFFF', fontFamily: 'Inter_600SemiBold', fontSize: 15 }}>
                {recording ? 'Stop & Send Instruction' : (uploading ? 'Sending...' : 'Hold to Record')}
              </Text>
            </Pressable>
          </View>
        )}

        <View>
          <Text style={{ color: colors.text, fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginBottom: 12 }}>
            {isManager ? 'Sent History' : 'Inbox'}
          </Text>

          {instructions.length > 0 ? (
            <View className="space-y-3">
              {instructions.map((inst) => (
                <View 
                  key={inst.id} 
                  style={{ 
                    backgroundColor: colors.card, 
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(62,39,35,0.05)', 
                    borderWidth: 1 
                  }}
                  className="rounded-xl p-4 flex-row items-center justify-between"
                >
                  <View className="flex-1">
                    <Text style={{ color: colors.text, fontFamily: 'Inter_600SemiBold', fontSize: 14 }}>
                      {isManager ? `To: ${inst.recipient}` : `From: ${inst.sender}`}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 2 }}>
                      {new Date(inst.created_at).toLocaleString()}
                    </Text>
                  </View>
                  <Pressable 
                    onPress={() => playVoice(inst.file_url)}
                    style={{ backgroundColor: colors.primary + '15' }}
                    className="p-3 rounded-full ml-3"
                  >
                    <Play size={20} color={colors.primary} />
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-10">
              <MessageSquare size={40} color={colors.textSecondary} opacity={0.5} />
              <Text style={{ color: colors.textSecondary, fontFamily: 'Inter_500Medium', fontSize: 14, marginTop: 12 }}>
                No messages found.
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
