import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  textFieldSearch: {
    placeholder: 'name',
    color: '#333333',
    height: '1vh',
    backgroundColor: '#F2F3F5',
    borderRadius: '50px',
    boxShadow: 'none',
    border: '2px solid white',
    padding: '20px',
    margin: '10px 0px',
    width: '300px',
    '&::placeholder': {
      color: '#666666',
    },
  },
})

function Input({ id, classes, value, onChange, placeholder }) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      className={classes.textFieldSearch}
      value={value}
      onChange={onChange}
    />
  )
}

export default withStyles(styles)(Input)
