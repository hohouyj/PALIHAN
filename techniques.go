package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/lithammer/fuzzysearch/fuzzy"
)

type Technique struct {
	Name            string   `json:"name"`
	DisciplineName  string   `json:"disciplineName"`
	IsEnlightenment bool     `json:"isEnlightenment"`
	Lore            string   `json:"lore"`
	PrereqNames     []string `json:"prereqNames"`
	Description     []string `json:"description"`
}

type Techniques struct {
	Techniques []Technique `json:"techniques"`
}

func (t Techniques) Names() []string {
	var reNames []string
	for i := 0; i < len(t.Techniques); i++ {
		reNames = append(reNames, t.Techniques[i].Name)
	}
	return reNames
}

func (t Techniques) Disciplines() []string {
	var reDisciplines []string
	for i := 0; i < len(t.Techniques); i++ {
		reDisciplines = append(reDisciplines, t.Techniques[i].DisciplineName)
	}
	return reDisciplines
}

func getTechniques() Techniques {
	jsonFile, err := os.Open("data/techniques.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened data/techniques.json")
	defer jsonFile.Close()
	byteValue, _ := io.ReadAll(jsonFile)
	var techniques Techniques
	json.Unmarshal(byteValue, &techniques)
	return techniques
}

func getFilteredTechniques(searchString string) Techniques {
	t := getTechniques()
	techniqueNames := t.Names()
	techniqueDisciplines := t.Disciplines()
	var reTechniques Techniques
	for i := 0; i < len(techniqueNames); i++ {
		if fuzzy.MatchFold(searchString, techniqueNames[i]) || fuzzy.MatchFold(searchString, techniqueDisciplines[i]) {
			reTechniques.Techniques = append(reTechniques.Techniques, t.Techniques[i])
		}
	}
	return reTechniques
}

func (t Technique) String() string {

	reStr := fmt.Sprintf(`
	Name: %q
	Discipline: %q
	isEnlightenment: %t
	Lore: %q
	Prerequisites: %s
	Description: %s
	`, t.Name, t.DisciplineName, t.IsEnlightenment, t.Lore, t.PrereqNames, t.Description)
	return reStr
}
