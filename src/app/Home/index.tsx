import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { ButtonInfo } from "@/components/ButtonInfo";
import { Input } from "@/components/Input";
import { FilterStatus } from "@/types/FilterStatus";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";
import { useState, useEffect } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemStorage"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PEDDING, FilterStatus.DONE]
// const ITEMS = [
//   {id: "1", status: FilterStatus.DONE, description: "Comprar teste"},
//   {id: "2", status: FilterStatus.DONE, description: "Comprar teste"},
//   {id: "3", status: FilterStatus.DONE, description: "Comprar teste"},
// ]

export function Home(){
  // Com o useState consigo monitorar o "filter" fazendo que quando tiver atualizaçao na variavel ja aplique no front
  const [filter, setFilter] = useState(FilterStatus.PEDDING)
  // let filter = FilterStatus.PEDDING

  const [description, setDescription] = useState('')
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if(!description.trim()){
      return Alert.alert("O Zé", "Informe a descrição zé")
    }

    await itemsStorage.add({
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PEDDING
    })

    
    Alert.alert("Adicionado", `Item: ${description}`)
    setDescription("")

    if(filter === FilterStatus.PEDDING){
      getItemByStatus()
    }else{
      setFilter(FilterStatus.PEDDING)
    }
  }

  async function getItems(){
    try {
      const response = await itemsStorage.get()
      console.log(response);
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Deu problema Zé")
    }
  }

  async function getItemByStatus(){
    try {
      const response = await itemsStorage.getByStatus(filter)
      console.log(response);
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Deu problema Zé")
    }
  }

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id)

      await getItemByStatus()
    } catch (error) {
      Alert.alert("Remover", "Erro ao deletar Zé")
    }
  }

  async function toggleStatus(id: string){
    try {
      await itemsStorage.toggleStatus(id)

      await getItemByStatus()
    } catch (error) {
      Alert.alert("Remover", "Erro ao alterar Zé")
    }
  }

  async function handleClearPeddingItems(){
    Alert.alert("Limpar", "Deseja remover os itens pendentes?", [
      { text: "Sim", onPress: onClearPeddingItems},
      { text: "Não", style: "cancel" },
    ])
    
  }

  async function onClearPeddingItems() {
    try {
      await itemsStorage.clearPeddingItems()

      await getItemByStatus()
    } catch (error) {
      Alert.alert("Remover", "Erro ao deletar Zé")
    }
  }

  useEffect(() => {
    // itemsStorage.get().then((res) => {
    //   console.log(res);
    // })
    getItemByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description} />
          
        <ButtonInfo title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status, key) => (
            <Filter 
              status={status} 
              key={key} 
              isActive={filter === status}
              onPress={() => (setFilter(status))} />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClearPeddingItems}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Item 
            data={item}
            onRemove={() => handleRemove(item.id)}
            onStatus={() => toggleStatus(item.id)} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />} />
        
      </View>
    </View>
  )
}