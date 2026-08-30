import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Switch } from 'react-native';
import { colors } from '../../theme/colors';

type Service = { id: string; name: string; unit: string; price: number; turnaroundDays: number; active: boolean };

const initialServices: Service[] = [
  { id: '1', name: 'Business Cards', unit: '100 pcs', price: 850, turnaroundDays: 2, active: true },
  { id: '2', name: 'A3 Poster', unit: 'piece', price: 120, turnaroundDays: 1, active: true },
  { id: '3', name: 'Sticker Sheet', unit: 'sheet', price: 50, turnaroundDays: 2, active: false },
];

export default function OwnerServicesScreen() {
  const [services, setServices] = useState(initialServices);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDays, setNewDays] = useState('');

  const updatePrice = (id: string, value: string) => {
    const price = Number(value) || 0;
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, price } : s)));
  };

  const toggleActive = (id: string) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  const removeService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    if (!newName || !newUnit || !newPrice || !newDays) return;
    setServices((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newName, unit: newUnit, price: Number(newPrice), turnaroundDays: Number(newDays), active: true },
    ]);
    setNewName('');
    setNewUnit('');
    setNewPrice('');
    setNewDays('');
    setShowNew(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Services</Text>
          <TouchableOpacity style={styles.newButton} onPress={() => setShowNew(!showNew)}>
            <Text style={styles.newButtonText}>{showNew ? 'Cancel' : '+ New'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Prices and turnaround times customers see on their quotes</Text>

        {showNew && (
          <View style={styles.newCard}>
            <TextInput style={styles.input} placeholder="Service name" placeholderTextColor={colors.textMuted} value={newName} onChangeText={setNewName} />
            <TextInput style={styles.input} placeholder="Unit (e.g. 100 pcs)" placeholderTextColor={colors.textMuted} value={newUnit} onChangeText={setNewUnit} />
            <TextInput style={styles.input} placeholder="Base price (Rs)" placeholderTextColor={colors.textMuted} value={newPrice} onChangeText={setNewPrice} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Turnaround (days)" placeholderTextColor={colors.textMuted} value={newDays} onChangeText={setNewDays} keyboardType="numeric" />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add service</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.list}>
          {services.map((service, i) => (
            <View key={service.id} style={[styles.serviceRow, i !== services.length - 1 && styles.serviceRowBorder]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceMeta}>per {service.unit} · {service.turnaroundDays}-day turnaround</Text>
              </View>
              <View style={styles.priceInputRow}>
                <Text style={styles.rsLabel}>Rs</Text>
                <TextInput
                  style={styles.priceInput}
                  value={String(service.price)}
                  onChangeText={(v) => updatePrice(service.id, v)}
                  keyboardType="numeric"
                />
              </View>
              <Switch
                value={service.active}
                onValueChange={() => toggleActive(service.id)}
                trackColor={{ false: colors.mist, true: colors.royalBlue }}
                thumbColor={colors.white}
              />
              <TouchableOpacity onPress={() => removeService(service.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.navy },
  newButton: { backgroundColor: colors.royalBlue, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  newButtonText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  headerSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  newCard: { backgroundColor: colors.mist, borderRadius: 14, padding: 14, marginBottom: 16, gap: 10 },
  input: { backgroundColor: colors.white, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: colors.navy },
  addButton: { backgroundColor: colors.navy, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  addButtonText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  serviceRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  serviceRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  serviceName: { fontSize: 13, fontWeight: '700', color: colors.navy },
  serviceMeta: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  priceInputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 8, gap: 4 },
  rsLabel: { fontSize: 11, color: colors.textMuted },
  priceInput: { width: 46, fontSize: 13, fontWeight: '700', color: colors.navy, textAlign: 'right', paddingVertical: 6 },
  removeText: { fontSize: 11, fontWeight: '700', color: '#DC2626' },
});