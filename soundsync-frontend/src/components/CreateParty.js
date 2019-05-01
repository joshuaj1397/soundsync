import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import SoundSyncInput from 'components/Input'
import SoundSyncButton from 'components/Button'
import Grid from '@material-ui/core/Grid'
import AppContainer from 'components/AppContainer'
import Logo from 'components/Logo'
import IntegrationNotistack from './Snackbar'
import soundsyncApi from '../api'
import Party from './Party'
import SoundSyncNavLink from 'components/NavLink'
import { Route, withRouter } from 'react-router-dom'

const styles = (theme) => {
  return {
    Container: {
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
  }
}

function CreateParty({ classes }) {
  const [values, setValues] = useState({
    nickName: '',
    phoneNumber: '',
    partyName: '',
    verifyCode: '',
    isVerifyCodeSent: false,
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

  const handleJoinParty = (e) => {
    e.preventDefault()
    console.log('Joining Party')
    // soundsyncApi.JoinParty(
    //   values.nickName,
    //   values.verifyCode,
    //   values.phoneNumber,
    // )
  }

  return (
    <AppContainer>
      <IntegrationNotistack />
      <Grid container className={classes.Container}>
        <Logo />
        <Grid item sm={6}>
          <SoundSyncInput
            id='partyName'
            value={values.partyName}
            placeholder='Enter Party Name'
            onChange={handleChange('partyName')}
          />
        </Grid>
        <Grid item sm={6}>
          <SoundSyncInput
            id='phoneNumber'
            value={values.phoneNumber}
            placeholder='Enter Phone Number'
            onChange={handleChange('phoneNumber')}
          />
        </Grid>
        <Grid item sm={6}>
          <SoundSyncInput
            id='nickName'
            value={values.nickName}
            placeholder='Enter Nick Name'
            onChange={handleChange('nickName')}
          />
        </Grid>
        {values.isVerifyCodeSent ? (
          <>
            <Grid item sm={6}>
              <SoundSyncInput
                id='verifyCode'
                placeholder='Enter Verification Code'
                value={values.verifyCode}
                onChange={handleChange('verifyCode')}
              />
            </Grid>
            <Grid item sm={6}>
              <Route path='/Party/4DR2' component={Party} />
              <SoundSyncButton
                variant='contained'
                color='secondary'
                onClick={handleJoinParty}
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
          </>
        ) : (
          <Grid item sm={6}>
            <SoundSyncButton
              variant='contained'
              color='secondary'
              type='submit'
              onClick={handleCreateParty}
            >
              Create Party
            </SoundSyncButton>
          </Grid>
        )}
      </Grid>
    </AppContainer>
  )
}

export default withStyles(styles)(CreateParty)
