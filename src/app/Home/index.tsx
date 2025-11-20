import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { ButtonInfo } from "@/components/ButtonInfo";
import { Input } from "@/components/Input";
import { FilterStatus } from "@/types/FilterStatus";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PEDDING, FilterStatus.DONE]
const ITEMS = [
  {id: "1", status: FilterStatus.DONE, description: "Comprar teste"},
  {id: "2", status: FilterStatus.DONE, description: "Comprar teste"},
  {id: "3", status: FilterStatus.DONE, description: "Comprar teste"},
]

export function Home(){
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <ButtonInfo title="Adicionar" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status, key) => (
            <Filter status={status} isActive key={key} />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Item 
            data={item}
            onRemove={() => console.log("remove")}
            onStatus={() => console.log("status")} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />} />
        
      </View>
    </View>
  )
}