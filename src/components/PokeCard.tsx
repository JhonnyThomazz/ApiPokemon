import React from "react";
import { Image, Text, View } from "react-native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { styles } from "../style/PokeCardStyle";

type PokeCardProps = {
    name: string;
    height: Double;
    weight: Double;
    picture: string;
};
export default function PokeCard({
    name, height, weight, picture
}: PokeCardProps) {
    return (
        <View style={styles.card}>
            <Image style={styles.imgC} source={{ uri: picture}}/>
            <Text>Nome: {name}</Text>
            <Text>Altura: {height}</Text>
            <Text>Peso: {weight}</Text>
        </View>
    );
}