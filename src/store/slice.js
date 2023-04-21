import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  stocksList: [],
  activePage: 1,
  pageLimit: 10,
  token: process.env.REACT_APP_TOKEN,
};

export const fetchStocksList = createAsyncThunk(
  "stocksList/fetchStocksList",
  (_, { getState }) => {
    const { activePage, pageLimit, token } = getState();
    return fetch(
      `https://cloud.iexapis.com/stable/stock/aapl/batch?types=chart&range=1m&limit=${
        pageLimit * activePage
      }&token=${token}`
    )
      .then((response) => response.json())
      .then((data) => data.chart)
      .catch((error) => console.error(error));
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    switchPage(state, action) {
      state.activePage = action.payload;
    },
    updateStocksList(state, action) {
      state.stocksList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStocksList.fulfilled, (state, action) => {
      state.stocksList = action.payload.slice(
        (state.activePage - 1) * state.pageLimit,
        state.activePage * state.pageLimit
      );
    });
  },
});

const { reducer: stocksReducer, actions } = stocksSlice;
export { stocksReducer };
export const { switchPage, updateStocksList } = actions;
