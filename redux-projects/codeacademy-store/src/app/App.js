import React from 'react';

import { Inventory } from '../features/inventory/Inventory.js';
import { CurrencyFilter } from '../features/currencyFilter/CurrencyFilter.js';
// Import the Cart component here.
import { Cart } from '../features/cart/Cart';
import { SearchTerm } from '../features/searchTerm/SearchTerm';

// Render the Cart component below <Inventory />
export const App = (props) => {
  const { state, dispatch } = props;

  return (
    <div>
      <CurrencyFilter currencyFilter={state.currencyFilter} dispatch={dispatch} />
      <SearchTerm searchTerm={state.searchTerm} dispatch={dispatch} />

      <Inventory
        searchTerm={state.searchTerm}
        inventory={state.inventory}
        currencyFilter={state.currencyFilter}
        dispatch={dispatch}
      />

      <Cart cart={state.cart} currencyFilter={state.currencyFilter} dispatch={dispatch} />
    </div>
  );
};
