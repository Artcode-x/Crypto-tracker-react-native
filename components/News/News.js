// import { Text, View } from "react-native"
import { styles } from "./News.styles"

import React, { useEffect, useState } from "react"
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import axios from "axios"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async () => {
    const apiKey = "dad4990451984ac944d6f7e25e0cfeb5edeb9ef4"
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}`

    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error("Error fetching news:", error)
      return null
    }
  }
  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews()
      if (newsData) {
        setNews(newsData.results)
      }
      setLoading(false)
    }

    getNews()
  }, [])

  if (loading) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <FlatList
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.createdAt}>
                {format(new Date(item.created_at), "dd MMMM yyyy", { locale: ru })}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}
