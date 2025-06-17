import { styles } from "./News.styles"

import React, { useEffect, useState } from "react"
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import axios from "axios"
import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(null)
  const [language, setLanguage] = useState("en")
  const [datePost, setDatePost] = useState(enUS)
  const fetchNews = async () => {
    const apiKey = "dad4990451984ac944d6f7e25e0cfeb5edeb9ef4"

    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&filter=${filter}&regions=${language}`

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
  }, [filter, language])

  const select = (button) => {
    switch (button) {
      case 1:
        setFilter("bullish")
        break
      case 2:
        setFilter("bearish")
        break
      case 3:
        setFilter("important")
        break
      case 4:
        setFilter("hot")
        break
      default:
        break
    }
  }

  const choseLang = (lang) => {
    if (lang === "ru") {
      setFilter(null)
      setLanguage("ru")
      setDatePost(ru)
    } else {
      setLanguage("en")
      setDatePost(enUS)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='red' style={{ paddingTop: "5%" }} />
      ) : (
        <>
          <FlatList
            style={{
              backgroundColor: "rgba(50, 48, 49, 0.8)",
              marginLeft: "4%",
              marginRight: "4%",
              marginBottom: "38%",
              borderWidth: 1,
              borderColor: "wheat",
              borderRadius: 20,
              marginTop: 4
            }}
            data={news}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.created_at), "dd MMMM yyyy", {
                    locale: datePost
                  })}
                </Text>
              </View>
            )}
          />
          <View style={styles.box}>
            <View style={styles.chartButtons}>
              <TouchableOpacity onPress={() => select(1)}>
                <Text
                  style={[
                    styles.chartButton,
                    filter === "bullish" && styles.activeButton
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      filter === "bullish" && styles.activeButtonText
                    ]}
                  >
                    Bullish
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => select(2)}>
                <Text
                  style={[
                    styles.chartButton,
                    filter === "bearish" && styles.activeButton
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      filter === "bearish" && styles.activeButtonText
                    ]}
                  >
                    Bearish
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => select(3)}>
                <Text
                  style={[
                    styles.chartButton,
                    filter === "important" && styles.activeButton
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      filter === "important" && styles.activeButtonText
                    ]}
                  >
                    Important
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => select(4)}>
                <Text
                  style={[styles.chartButton, filter === "hot" && styles.activeButton]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      filter === "hot" && styles.activeButtonText
                    ]}
                  >
                    Hot
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chartButtons}>
              <TouchableOpacity onPress={() => choseLang("ru")}>
                <Text
                  style={[styles.chartButton2, language === "ru" && styles.activeButton]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      language === "ru" && styles.activeButtonText
                    ]}
                  >
                    Ru
                  </Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => choseLang("en")}>
                <Text
                  style={[styles.chartButton2, language === "en" && styles.activeButton]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      language === "en" && styles.activeButtonText
                    ]}
                  >
                    En
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  )
}
