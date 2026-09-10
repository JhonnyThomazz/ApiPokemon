import { apiPoke } from "@/services/apiPoke";
import { styles } from "@/style/indexStyle";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import PokeCard from "../components/PokeCard";

type Pokemon = {
  name: string;
  height: Double;
  weight: Double;
  picture: string;
  erro?: boolean;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  async function buscarPoke() {
    if (nome.length < 1) {
      Alert.alert(
        "Nome do pokémon inválido!",
        "Confira se o nome foi escrito corretamente."
      );
      return;
    }

    try {
      const resposta = await apiPoke.get(
        `/pokemon/${nome.toLowerCase()}/`
      );

      if (resposta.data.erro) {
        Alert.alert(
          "Pokémon não encontrado!",
          "Verifique o nome informado."
        );
        return;
      }

      setPokemon({
        picture: resposta.data.sprites.front_default,
        name: resposta.data.name,
        height: resposta.data.height / 10,
        weight: resposta.data.weight / 10,
      });

    } catch (error) {
      Alert.alert(
        "Erro!",
        "Não foi possível consultar o Pokémon."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        PokéDex.
      </Text>

      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Pressable style={styles.pressable} onPress={buscarPoke}>
        <Text>Buscar Pokémon</Text>
      </Pressable>

      {pokemon && (
        <PokeCard
          name={pokemon.name}
          height={pokemon.height}
          weight={pokemon.weight}
          picture={pokemon.picture}
               />
      )}
    </View>
  );
}
