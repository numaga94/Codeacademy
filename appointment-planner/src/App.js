import React, { useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import { AppointmentsPage } from './containers/appointmentsPage/AppointmentsPage';
import { ContactsPage } from './containers/contactsPage/ContactsPage';

function App() {
  /*
  Define state variables for 
  contacts and appointments 
  */
  const [contacts, setContacts] = useState([
    {
      name: 'Jack',
      phoneNumber: 39459559543,
      email: 'jack@gmail.com'
    },
    {
      name: 'Mary',
      phoneNumber: 49484838343,
      email: 'mary@gmail.com'
    },
    {
      name: 'Dark',
      phoneNumber: 94854393845,
      email: 'dark@gmail.com'
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      title: 'month budget for office',
      contact: 'Mary',
      date: '2022-04-05',
      time: '11:45'
    },
    {
      title: 'raise new standard for extra-time compensation',
      contact: 'Dark',
      date: '2022-04-15',
      time: '10:30'
    }
  ]);

  const ROUTES = {
    CONTACTS: '/contacts',
    APPOINTMENTS: '/appointments'
  };

  /*
  Implement functions to add data to
  contacts and appointments
  */

  const addContact = (contact) => {
    if (contacts.some((value) => value.name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`oppoose... ${contact.name} is already in contact list`);
    } else {
      setContacts((prev) => [...prev, contact]);
      // console.log(contacts);
    }
  };

  const addAppointment = (appointment) => {
    if (appointments.some((value) => value.date === appointment.date && value.time === appointment.time)) {
      alert(
        `ooppooose... time on ${appointment.date} at ${appointment.time} is occupied, please choose a different time.`
      );
    } else {
      setAppointments((prev) => [...prev, appointment]);
      // console.log(appointments);
    }
  };

  return (
    <React.Fragment>
      <nav>
        <NavLink to={ROUTES.CONTACTS} activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.CONTACTS} />
          </Route>
          <Route path={ROUTES.CONTACTS}>
            {/* Add props to ContactsPage */}
            <ContactsPage contacts={contacts} addContact={addContact} />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            {/* Add props to AppointmentsPage */}
            <AppointmentsPage contacts={contacts} appointments={appointments} addAppointment={addAppointment} />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
