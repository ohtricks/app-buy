// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { ButtonInfo } from "@/components/ButtonInfo";
import { Input } from "@/components/Input";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


export function Home(){
  return (
    <View
      style={styles.container}>
        <Image source={require("@/assets/logo.png")} />
        <Input placeholder="O que você precisa comprar?" />
        <ButtonInfo title="Adicionar" />
    </View>
  )
}