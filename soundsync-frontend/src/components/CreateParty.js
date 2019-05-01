import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import SoundSyncInput from 'components/Input'
import SoundSyncButton from 'components/Button'
import Grid from '@material-ui/core/Grid'
import AppContainer from 'components/AppContainer'
import Logo from 'components/Logo'
import soundsyncApi from '../api'
import Party from './Party'
import SoundSyncNavLink from 'components/NavLink'
import { Route, withRouter } from 'react-router-dom'

const styles = (theme) => {
  return {
    ButtonField: {
      width: 160,
      maxWidth: 500,
    },
    ButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '135px 0px',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    Input: {
      textAlign: 'center',
      padding: '0 !important',
    },
  }
}

function CreateParty({ classes }) {
  const [values, setValues] = useState({
    nickName: '',
    phoneNumber: '',
    partyName: '',
  })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  // TODO: Make a POST to see if the verification code is correct before creating the party
  const handleCreateParty = (e) => {
    e.preventDefault()
    console.log('Created a party!')
    // soundsyncApi.CreateParty(
    //   values.nickName,
    //   values.phoneNumber,
    //   values.partyName,
    // )
  }

  return (
    <AppContainer>
      <Logo />
      <Grid className={classes.Input} item xs={12}>
        <SoundSyncInput
          id='partyName'
          value={values.partyName}
          placeholder='Party Name'
          onChange={handleChange('partyName')}
        />
        <SoundSyncInput
          id='phoneNumber'
          value={values.phoneNumber}
          placeholder='Phone Number'
          onChange={handleChange('phoneNumber')}
        />
        <SoundSyncInput
          id='nickName'
          value={values.nickName}
          placeholder='Nick Name'
          onChange={handleChange('nickName')}
        />
        <Route path='/Party/4DR2' component={Party} />
        <SoundSyncButton
          variant='contained'
          color='secondary'
          type='submit'
          className={classes.textField}
          onClick={handleCreateParty}
        >
          <SoundSyncNavLink
            color='inherit'
            to='/Party/4DR2'
            className={classes.ButtonField}
          >
            Create Party
          </SoundSyncNavLink>
        </SoundSyncButton>
      </Grid>
    </AppContainer>
  )
}

export default withStyles(styles)(CreateParty)
