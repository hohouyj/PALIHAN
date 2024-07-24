package main

import (
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Technique struct {
	Name            string
	DisciplineName  string
	IsEnlightenment bool
	Lore            string
	Description     []string
	PrereqNames     []string
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()
	renderer := &Template{
		templates: template.Must(template.ParseGlob("*.html")),
	}
	e.Renderer = renderer

	e.Static("/static", "data")
	count := 0
	e.GET("/", func(c echo.Context) error {
		t := Technique{
			Name:            "Balatik Trap Technique",
			DisciplineName:  "Beast Hunter",
			IsEnlightenment: false,
			Lore:            "Balatik are the most well known contraption and trap of hunters in The Sword Isles: they are small bamboo ballistas and arbalests that, when triggered, skewers the unsuspecting prey with a long bamboo spike. It turns out that this is just as effective for humans as it is for wild boar and deer.",
			Description:     []string{"You begin Violence with 3 Balatik Traps. Spend 1 Beat: consume and activate a balatik trap: choose a square in range 5 as the origin point for a Line 6. All enemies in the line suffer 1 True Hit, SPD Down (2), Bleed (2)."},
			PrereqNames:     []string{"this is a prereq"},
		}
		return c.Render(http.StatusOK, "technique", t)
	})
	e.GET("/button", func(c echo.Context) error {
		count++
		return c.Render(http.StatusOK, "count", count)
	})
	e.Logger.Fatal(e.Start(":8000"))
}
