import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ListOrderEvaluated: [],
}
export const orderEvaluateSlide = createSlice({
    name: 'orderEvaluate',
    initialState,
    reducers: {
        addorderEvaluateProduct: (state, action) => {
            state.ListOrderEvaluated.push(action.payload)

        },
    },
})

// Action creators are generated for each case reducer function
export const { addorderEvaluateProduct } = orderEvaluateSlide.actions

export default orderEvaluateSlide.reducer