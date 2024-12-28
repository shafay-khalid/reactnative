import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';

export default function AddEvent({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAddEvent = async () => {
    const newErrors = {};

    if (!title) newErrors.title = 'Event Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!location) newErrors.location = 'Location is required';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    if (!category) newErrors.category = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const eventData = {
      title,
      description,
      location,
      date,
      time,
      category,
      isPrivate,
    };

    try {
      const response = await fetch('http://192.168.100.23:5028/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (data.status === 'ok') {
        Alert.alert('Success', 'Event added successfully');
        navigation.navigate('Events');
      } else {
        Alert.alert('Error adding event: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        placeholderTextColor={"grey"}
        value={title}
        onChangeText={(val) => {
          setTitle(val);
          setErrors((prev) => ({ ...prev, title: '' }));
        }}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={"grey"}
        value={description}
        onChangeText={(val) => {
          setDescription(val);
          setErrors((prev) => ({ ...prev, description: '' }));
        }}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={"grey"}
        value={location}
        onChangeText={(val) => {
          setLocation(val);
          setErrors((prev) => ({ ...prev, location: '' }));
        }}
      />
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        placeholderTextColor={"grey"}
        value={date}
        onChangeText={(val) => {
          setDate(val);
          setErrors((prev) => ({ ...prev, date: '' }));
        }}
      />
      {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Time"
        placeholderTextColor={"grey"}
        value={time}
        onChangeText={(val) => {
          setTime(val);
          setErrors((prev) => ({ ...prev, time: '' }));
        }}
      />
      {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor={"grey"}
        value={category}
        onChangeText={(val) => {
          setCategory(val);
          setErrors((prev) => ({ ...prev, category: '' }));
        }}
      />
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

      <View style={styles.switch }>
        <Text>Private Event</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add Event" color="black" onPress={handleAddEvent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#f0f8ff' },
  title: { fontSize: 40, color: '#333', fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 10, width: '100%', color: '#333', padding: 10, backgroundColor: '#fff' },
  buttonContainer: { width: '100%', marginTop: 10 },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
});