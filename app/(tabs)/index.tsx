import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Button,
  FlatList,
} from "react-native";
import axios from "axios";
import UserCard from "@/components/UserCard";

const URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  async function fetchData() {
    const response = await axios.get(URL);
    setLoading(false);
    setUserList(response.data);
    console.log(response);
    // response.data, JSONPlaceholder API'den TÜM dönen kullanıcı verisi içerir.
    //flatlist örneklerindeki DATA gibi düşün.
  }

  const renderUser = ({ item }) => (
    <UserCard name={item.name} email={item.email} userName={item.userName} />
  );

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList data={userList} renderItem={renderUser} />
        )}
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
