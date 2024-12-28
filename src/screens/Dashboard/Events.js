import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('public'); // 'public' or 'private'
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://192.168.100.23:5028/get-items');
      const data = await response.json();
      if (data.status === 'ok') {
        setEvents(data.items);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const isPublic = filter === 'public' ? !event.isPrivate : event.isPrivate;
    const matchesSearch = event.title.includes(searchTerm) || event.description.includes(searchTerm);
    return isPublic && matchesSearch;
  });

  return (
    <View>
      <Text>Events</Text>
      <TextInput placeholder="Search Events" value={searchTerm} onChangeText={setSearchTerm} />
      <Button title="Show Public Events" onPress={() => setFilter('public')} />
      <Button title="Show Private Events" onPress={() => setFilter('private')} />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.location}</Text>
            <Text>{item.date}</Text>
            <Text>{item.time}</Text>
            <Text>{item.category}</Text>
            <Text>{item.isPrivate ? 'Private Event' : 'Public Event'}</Text>
          </View>
        )}
      />
    </View>
  );
}