const baseUrl = 'http://localhost:3005'

const SoundSyncAPI = {
  CreateParty: function(nickName, phoneNum, partyName, token) {
    fetch(
      baseUrl + '/CreateParty/' + nickName + '/' + partyName + '/' + phoneNum,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          console.log(error)
          return error
        },
      )
  },

  JoinParty: function(nickName, partyCode, phoneNum, token) {
    fetch(
      baseUrl + '/JoinParty/' + nickName + '/' + partyCode + '/' + phoneNum,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result === 'Party Joined') {
            return result
            console.log('API: Joined Party')
          } else {
            console.log('API: Join Party failed')
          }
        },
        (error) => {
          return error
          console.log(error)
        },
      )
  },

  LinkSpotify: function() {
    fetch(baseUrl + '/LinkSpotify').then((res) => {
      return res
    })
  },

  Callback: function() {
    fetch(baseUrl + '/callback').then((res) => {
      return null
    }) // Do something with the result
  },

  Play: function() {
    fetch(baseUrl + '/MediaControls/Play').then((res) => {
      return null
    }) // Do something with the result
  },

  Pause: function() {
    fetch(baseUrl + '/MediaControls/Pause').then((res) => {
      return null
    }) // Do something with the result
  },

  Next: function() {
    fetch(baseUrl + '/MediaControls/Next').then((res) => {
      return null
    }) // Do something with the result
  },

  Previous: function() {
    fetch(baseUrl + '/MediaControls/Previous').then((res) => {
      return null
    }) // Do something with the result
  },

  SearchSpotify: function(query) {
    fetch(baseUrl + '/SearchSpotfy/' + query).then((res) => {
      return null
    }) // Do something with the result
  },

  AddSong: function(songURI) {
    fetch(baseUrl + '/AddSong/' + songURI).then((res) => {
      return null
    }) // Do something with the result
  },
}

export default SoundSyncAPI
