import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(3),
    width: '6rem'
  }
}));

export const AppointmentForm = ({
  contacts,
  title,
  setTitle,
  contact,
  setContact,
  date,
  setDate,
  time,
  setTime,
  handleSubmit
}) => {
  const classes = useStyles();
  const today = new Date();
  const getDateString = (date = today) => {
    const [month, day, year] = new Date(date).toLocaleDateString('en-US', { timeZone: 'Europe/Paris' }).split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  const getTimeString = (date = today) => {
    const [hour, minute] = new Date(date)
      .toLocaleTimeString('en-US', { timeZone: 'Europe/Paris', hour12: false })
      .split(':');
    return `${hour}:${minute}`;
  };

  const handleDateTime = ({ target }) => {
    try {
      setDate(getDateString(target.value));
      setTime(getTimeString(target.value));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Title"
        value={title}
        onChange={({ target }) => {
          setTitle(target.value);
        }}
      />
      <Select
        native
        value={contact}
        onChange={({ target }) => {
          setContact(target.value);
        }}
        inputProps={{
          name: 'contact',
          id: 'contact-native-simple'
        }}
      >
        <option aria-label="None" value="" label="Contact" />
        {contacts.map((contact, index) => {
          return (
            <option key={index} value={contact.name}>
              {contact.name}
            </option>
          );
        })}
      </Select>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue={`${getDateString()}T${getTimeString()}`}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleDateTime}
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
