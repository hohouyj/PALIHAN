package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"database/sql"

	_ "github.com/lib/pq"
)

func sus() {
	connStr := "user=postgres.aiifjdthzrrfawfdkpyw password=JTiscute4sure host=aws-0-ap-southeast-1.pooler.supabase.com port=6543 dbname=postgres"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	{ // Create a new table
		query := `
	        CREATE TABLE users (
	            id serial not null primary key,
	            username VARCHAR(255) NOT NULL,
	            password VARCHAR(255) NOT NULL,
	            created_at timestamp
	        );`

		if _, err := db.Exec(query); err != nil {
			log.Fatal(err)
			fmt.Printf("lmao")
		}
	}

	{ // Insert a new user
		var username string = "johndoe"
		var password string = "secret"
		createdAt := time.Now()
		var userid int
		err := db.QueryRow(`INSERT INTO users(username, password, created_at) VALUES($1, $2, $3) RETURNING id`, username, password, createdAt).Scan(&userid)
		if err != nil {
			log.Fatal(err)
		}

	}
	{
		var (
			id        int
			username  string
			password  string
			createdAt time.Time
		)

		if err := db.QueryRow(`SELECT id, username, password, created_at FROM users WHERE username = $1`, "johndoe").Scan(&id, &username, &password, &createdAt); err != nil {
			log.Fatal(err)
		}
		fmt.Println(id, username, password, createdAt)

	}
	http.ListenAndServe(":80", nil)
}
