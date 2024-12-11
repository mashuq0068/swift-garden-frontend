import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceRange {
  min: number | string;
  max: number | string;
}

interface FilterState {
  categories: number[];
  priceRange: PriceRange;
}

const initialState: FilterState = {
  categories: [],
  priceRange: { min: "", max: "" },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<number>) {
      const categoryId = action.payload;
      if (state.categories.includes(categoryId)) {
        state.categories = state.categories.filter((id) => id !== categoryId);
      } else {
        state.categories.push(categoryId);
      }
    },
    updatePriceRange(state, action: PayloadAction<PriceRange>) {
      state.priceRange = { ...state.priceRange, ...action.payload };
    },
    resetFilters(state) {
      state.categories = [];
      state.priceRange = { min: "", max: "" };
    },
  },
});

export const { toggleCategory, updatePriceRange, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;