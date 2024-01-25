package main

//localidade, frequência e palavra chaves)
import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly/v2"
)

func searchOnGoogle() []string {
	c := colly.NewCollector()
	var data []string

	c.OnHTML(".text", func(e *colly.HTMLElement) {
		data = append(data, e.Text)
	})

	rand := strconv.Itoa(rand.Intn(10))
	url := fmt.Sprintf(`http://quotes.toscrape.com/page/%s`, rand)
	c.Visit(url)

	return data
}

type Request struct {
	Localidade string `json:"localidade"`
	Frequencia string `json:"frequencia"`
	Keyword    string `json:"keyword"`
}

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3005"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type"}

	r.Use(cors.New(config))

	r.POST("/search", func(c *gin.Context) {
		request := Request{}

		err := c.BindJSON(&request)
		if err != nil {
			fmt.Println(err)
			return
		}

		data := searchOnGoogle()

		var res string

		for i := 0; i < len(data); i++ {
			if i > 0 {
				res += "|"
			}

			res += fmt.Sprintf(`"%s"`, data[i])
		}

		finalJSON, err := json.Marshal(map[string]interface{}{
			"localidade":  request.Localidade,
			"frequencia":  request.Frequencia,
			"keyword":     request.Keyword,
			"scrapResult": res,
		})

		if err != nil {
			fmt.Println("Error marshalling JSON:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		url := "http://localhost:3000/search-data"

		req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(finalJSON)))
		if err != nil {
			fmt.Println("Erro ao criar a requisição:", err)
			return
		}

		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println("Erro ao fazer a solicitação:", err)
			return
		}
		defer resp.Body.Close()

		fmt.Println("Status da resposta:", resp.Status)
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})
	r.Run()

}
