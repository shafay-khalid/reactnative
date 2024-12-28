import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddItems({ navigation }) {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState({});

    const handleAddItem = async () => {
        const newErrors = {};
    
        if (!productName) newErrors.productName = 'Product Name is required';
        if (!price) newErrors.price = 'Price is required';
        if (!description) newErrors.description = 'Description is required';
        if (!category) newErrors.category = 'Category is required';
        if (!location) newErrors.location = 'Location is required';
        if (!date) newErrors.date = 'Date is required';
        if (!time) newErrors.time = 'Time is required';
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const response = await axios.post("http://192.168.100.23:5028/add-item", {
                productName,
                price: parseFloat(price),
                description,
                category,
                location,
                date, // Use the date string directly
                time, // Use the time string directly
            });
    
            if (response.data.status === 'ok') {
                Alert.alert('Success', 'Item added successfully');
                setProductName('');
                setPrice('');
                setDescription('');
                setCategory('');
                setLocation('');
                setDate('');
                setTime('');
                setErrors({});
                navigation.navigate('Catalogs', { refresh: true });
            } else {
                Alert.alert('Error', response.data.message || 'Failed to add item');
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert('Error', 'Failed to connect to server. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Your Event</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Event Name"
                placeholderTextColor={"grey"}
                value={productName}
                onChangeText={(val) => {
                    setProductName(val);
                    setErrors((prev) => ({ ...prev, productName: '' }));
                }}
            />
            {errors.productName && <Text style={styles.errorText}>{errors.productName}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Price"
                placeholderTextColor={"grey"}
                value={price}
                keyboardType="numeric"
                onChangeText={(val) => {
                    setPrice(val);
                    setErrors((prev) => ({ ...prev, price: '' }));
                }}
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Event Description"
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
                placeholder="Enter Event Location"
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
                placeholder="Enter Date (YYYY-MM-DD)"
                placeholderTextColor={"grey"}
                value={date}
                onChangeText={(val) => {
                    setDate (val);
                    setErrors((prev) => ({ ...prev, date: '' }));
                }}
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Time (HH:MM)"
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
                placeholder="Enter Category"
                placeholderTextColor={"grey"}
                value={category}
                onChangeText={(val) => {
                    setCategory(val);
                    setErrors((prev) => ({ ...prev, category: '' }));
                }}
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Add Item" color="black" onPress={handleAddItem} />
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
});