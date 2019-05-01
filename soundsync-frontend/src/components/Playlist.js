import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IntegrationNotistack from './Snackbar'

const styles = (theme) => {
  return {}
}

function queueSong(song) {
  //create a unike key for each new fruit item
  var timestamp = new Date().getTime()
  // update the state object
  this.state.songs['song-' + timestamp] = song
  // set the state
  this.setState({ songs: this.state.songs })
}

function Playlist({ classes }, props) {
  const [values, setValues] = useState({
    songs: {
      hello: '7 rings',
      its: 'thank u, next',
      its1: 'Icy Grl',
      its2: 'All Mine',
      its3: 'I Love It',
      its4: 'Be Careful',
      its5: 'Caroline',
      its6: 'Doses & Mimosas',
    },
    artists: {
      a1: 'ariana',
      a2: 'ariana',
      a3: 'saweetie',
      a4: 'kanye',
      a5: 'kanye',
      a6: 'cardi b',
      a7: 'amine',
      a8: 'cherub',
    },
  })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <div className='container'>
      <ul className='container'>
        {Object.keys(values.songs).map(
          function(key) {
            return (
              <li className='containerTitle'>
                <div className='divClassLeft'>
                  <div>{values.songs[key]}</div>
                  <div className='divWeightArtist'>{values.songs[key]}</div>
                </div>
                <div align='right'>
                  <IntegrationNotistack />
                </div>
              </li>
            )
          }.bind(this),
        )}
      </ul>
    </div>
  )
}

export default withStyles(styles)(Playlist)
