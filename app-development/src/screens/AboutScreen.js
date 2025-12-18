import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';


export default function AboutScreen() {
return (
<Layout>
<View style={styles.container}>
<Text style={styles.text}>About</Text>
</View>
</Layout>
);
}


const styles = StyleSheet.create({
container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
text: { fontSize: 20, fontWeight: '600' },
});