package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/lithammer/fuzzysearch/fuzzy"
)

type Violence struct {
	Name        string `json:"name"`
	ActionCost  string `json:"actionCost"`
	Lore        string `json:"lore"`
	Description string `json:"description"`
}

type Traits struct {
	Name        string `json:"name"`
	Lore        string `json:"lore"`
	Description string `json:"description"`
}

type Discipline struct {
	Name              string     `json:"name"`
	Hp                int        `json:"hp"`
	Style             string     `json:"Style"`
	Faction           string     `json:"faction"`
	WeaponSuggestions string     `json:"weaponSuggestions"`
	ArmorSuggestions  string     `json:"armorSuggestions"`
	Traits            []Traits   `json:"traits"`
	Violence          []Violence `json:"violence"`
}

func (d Discipline) String() string {
	reStr := fmt.Sprintf(`
	Name: %q
	Hp: %q
	Style: %q
	Faction: %q
	Weapon Suggestions: %v
	Armor Suggestions: %v
	Traits: %v
	Violence: %v
	`, d.Name, d.Hp, d.Style, d.Faction, d.WeaponSuggestions, d.ArmorSuggestions, d.Traits, d.Violence)
	return reStr
}

type Disciplines struct {
	Disciplines []Discipline `json:"disciplines"`
}

func (d Disciplines) Names() []string {
	var reNames []string
	for i := 0; i < len(d.Disciplines); i++ {
		reNames = append(reNames, d.Disciplines[i].Name)
	}
	return reNames
}

func getDisciplines() Disciplines {
	jsonFile, err := os.Open("data/disciplines.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened data/disciplines.json")
	defer jsonFile.Close()
	byteValue, _ := io.ReadAll(jsonFile)
	var disciplines Disciplines
	json.Unmarshal(byteValue, &disciplines)
	return disciplines
}

func getFilteredDisciplines(searchString string) Disciplines {
	d := getDisciplines()
	disciplineName := d.Names()
	var reDisciplines Disciplines
	for i := 0; i < len(disciplineName); i++ {
		if fuzzy.MatchFold(searchString, disciplineName[i]) {
			reDisciplines.Disciplines = append(reDisciplines.Disciplines, d.Disciplines[i])
		}
	}
	return reDisciplines
}
