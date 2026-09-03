import React from "react";
import { Text, View } from "react-native";
import { styles } from "../style/PokeCardStyle";

type PokeCardProps = {
    name: string;
    height: string;
    weight: string;
};
export default function PokeCard({
    name, height, weight,
}: PokeCardProps) {
    return (
        <View style={styles.card}>
            <Text>nome: {name}</Text>
            <Text>Rua: {height}</Text>
            <Text>peso: {weight}</Text>
        </View>
    );
}