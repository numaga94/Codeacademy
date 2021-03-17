import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, login } from './actions/index';

function App() {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>hello there</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <div className="message">
        <button onClick={() => dispatch(login())}>SHOW ME</button>
        {isLogged ? <h3>You are about to read the top secerct messages.</h3> : <h3>Login please</h3>}
      </div>
    </div>
  );
}

export default App;
