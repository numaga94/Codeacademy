import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from '../features/transactions/transactionsSlice';
import budgetsSlice from '../features/budgets/budgetsSlice';

export default configureStore({
  reducer: {
    transactions: transactionsSlice,
    budgets: budgetsSlice
  }
});
