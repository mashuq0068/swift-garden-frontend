import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceRange {
  min: string | number;
  max: string | number;
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
  name: "filter",
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
      state.priceRange = action.payload;
    },
  },
});

export const { toggleCategory, updatePriceRange } = filterSlice.actions;
export default filterSlice.reducer;
