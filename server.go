package main

import (
	"errors"
	"fmt"
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

func TemplateData(pairs ...any) (map[string]any, error) {
	if len(pairs)%2 == 1 {
		return nil, errors.New("TemplateData: uses key value pairs")
	}
	templateData := make(map[string]any, len(pairs)/2)
	for i := 0; i < len(pairs); i += 2 {
		key := fmt.Sprintf("%v", pairs[i])
		value := pairs[i+1]
		if key == "templateData" {
			templateData, ok := value.(map[string]any)
			if ok {
				for key, value := range templateData {
					templateData[key] = value
				}
				continue
			}
		}
		templateData[key] = value
	}
	fmt.Println(templateData)
	return templateData, nil
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	t := getTechniques()
	e := echo.New()
	e.Debug = true
	renderer := &Template{
		templates: template.Must(
			template.New("index").Funcs(template.FuncMap{"TemplateData": TemplateData}).ParseGlob("templates/*.html")),
	}

	e.Renderer = renderer

	e.Static("/static", "data")

	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index", nil)
	})

	e.GET("/techniques", func(c echo.Context) error {
		return c.Render(http.StatusOK, "techniques", t.Techniques[0:10])
	})

	e.GET("/filteredTechniques", func(c echo.Context) error {
		searchTechniqueString := c.FormValue("searchTechniqueString")
		return c.Render(http.StatusOK, "techniquesList", getFilteredTechniques(searchTechniqueString).Techniques)
	})
	e.Logger.Fatal(e.Start(":42069"))
}
