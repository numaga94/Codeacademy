import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  button: {
    margin: theme.spacing(3),
    width: '6rem'
  }
}));

export const ContactForm = ({ name, setName, phoneNumber, setPhoneNumber, email, setEmail, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Name"
        value={name}
        onChange={({ target }) => {
          setName(target.value);
        }}
      />
      <TextField
        id="filled-basic"
        label="Phone number"
        value={phoneNumber}
        onChange={({ target }) => {
          setPhoneNumber(target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        value={email}
        onChange={({ target }) => {
          setEmail(target.value);
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Add
      </Button>
    </form>
  );
};
