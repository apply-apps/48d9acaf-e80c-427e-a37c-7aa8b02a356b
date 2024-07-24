// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function App() {
    const [gender, setGender] = React.useState('male');
    const [age, setAge] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [activityLevel, setActivityLevel] = React.useState('sedentary');
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState(null);

    const calculateCalories = async () => {
        if (!age || !weight || !height) {
            Alert.alert("Please fill out all fields.");
            return;
        }

        setLoading(true);

        const messages = [
            {
                role: "system",
                content: "You are a helpful assistant. Please provide answers for given requests."
            },
            {
                role: "user",
                content: `Calculate daily calorie needs for a ${age}-year-old ${gender} with a weight of ${weight} kg, height of ${height} cm, and activity level ${activityLevel}.`
            }
        ];

        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages,
                model: "gpt-4o"
            });

            setResult(response.data.response);
        } catch (error) {
            Alert.alert("Error calculating calories. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Calories Calculator</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChangeText={setWeight}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Height (cm)"
                    value={height}
                    onChangeText={setHeight}
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={activityLevel}
                        onValueChange={(itemValue) => setActivityLevel(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Sedentary" value="sedentary" />
                        <Picker.Item label="Lightly active" value="lightly_active" />
                        <Picker.Item label="Moderately active" value="moderately_active" />
                        <Picker.Item label="Very active" value="very_active" />
                        <Picker.Item label="Super active" value="super_active" />
                    </Picker>
                </View>
                <Button title="Calculate" onPress={calculateCalories} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {result && <Text style={styles.result}>{result}</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});