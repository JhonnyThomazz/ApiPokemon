import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import PokeCard from "../components/PokeCard";
import { apiPoke } from "@/services/apiPoke";
import { styles } from "@/style/indexStyle";

type Pokemon = {
  name: string;
  height: string;
  weight: string;
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
        name: resposta.data.name,
        height: resposta.data.height,
        weight: resposta.data.weight,
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
      />

      <Pressable onPress={buscarPoke}>
        <Text>Buscar Pokémon</Text>
      </Pressable>

      {pokemon && (
        <PokeCard
          name={pokemon.name}
          height={pokemon.height}
          weight={pokemon.weight}
        />
      )}
    </View>
  );
}
