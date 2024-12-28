import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';

export default function Catalogs() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://192.168.100.23:5028/get-items');
                if (response.data.status === 'ok') {
                    setItems(response.data.items);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    // Filter items based on the search query
    const filteredItems = items.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Events</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title..."
                placeholderTextColor={"grey"}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item._id} // Assuming each item has a unique _id
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Title: {item.productName}</Text>
                        <Text style={styles.itemDescription}>Description: {item.description}</Text>
                        <Text style={styles.itemDetail}>Price: ${item.price}</Text>
                        <Text style={styles.itemDetail}>Category: {item.category}</Text>
                        <Text style={styles.itemDetail}>Location: {item.location}</Text>
                        <Text style={styles.itemDetail}>Date: {item.date}</Text>
                        <Text style={styles.itemDetail}>Time: {item.time}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f0f8ff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2, // For Android shadow
    },
    itemTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    itemDescription: { fontSize: 16, marginBottom: 8, color: '#555' },
    itemDetail: { fontSize: 14, marginBottom: 4, color: '#333' },
    errorText: { color: 'red', textAlign: 'center' },
});  