package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joshuaj1397/soundsync/model"
)

var mySigningKey = []byte("ASuperSecretSigningKeyCreatedByTheAliensFromArrival")

var GetToken = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	fmt.Println(":)")
})

// CreateParty returns the party code so the host can send it out to others
var CreateParty = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	phoneNum := params["phoneNum"]
	nickname := params["nickname"]
	partyName := params["partyName"]

	partyCode, err := model.CreateParty(partyName, phoneNum, nickname)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(partyCode)
})

var JoinParty = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	partyCode := params["partyCode"]
	nickname := params["nickname"]
	phoneNum := params["phoneNum"]
	err := model.JoinParty(partyCode, nickname, phoneNum)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode("Party joined")
})

// func Verify(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	phoneNum := params["phoneNum"]
// 	name := params["name"]
// 	authCode := params["authCode"]
// 	status, err := model.Verify(phoneNum, name, authCode)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	json.NewEncoder(w).Encode(status)
// }

// func LinkSpotify(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	//TODO: Make call to spotify API
// 	json.NewEncoder(w).Encode(spotifyUserId)
// }
//
// func SearchSpotify(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	query := params["query"]
// 	//TODO: Make call to spotify API
// 	json.NewEncoder(w).Encode(songs)
// }
//
// func AddSong(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	songId := params["songId"]
// 	partyId := params["partyId"]
// 	status, err := model.AddSong(songId, partyId)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	json.NewEncoder(w).Encode(status)
// }
//
// func SongQueue(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	partyId := params["partyId"]
// 	songQueue, err := model.SongQueue(partyId)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	json.NewEncoder(w).Encode(songQueue)
// }
//
// func SkipSong(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	songId := params["songId"]
// 	partyId := params["partyId"]
// 	//TODO: Make call to spotify API
// 	status, err := model.SkipSong(songId, partyId)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	json.NewEncoder(w).Encode(status)
// }
//
// func RemoveSong(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	songId := params["songId"]
// 	partyId := params["partyId"]
// 	status, err := model.RemoveSong(songId, partyId)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	json.NewEncoder(w).Encode(status)
// }
