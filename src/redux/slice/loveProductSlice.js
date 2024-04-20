import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userIds: [],
    loveProItems: [],
    isSucesslovePro: false,
}
export const loveProSlide = createSlice({
    name: 'lovePro',
    initialState,
    reducers: {
        addloveProProduct: (state, action) => {
            const { loveProItem } = action.payload
            const { userID } = action.payload
            //console.log('action.payload', userID, loveProItem)
            const itemlovePro = state?.loveProItems?.find((item) => item?.product === loveProItem.product)
            if (itemlovePro) {
                state.isSucesslovePro = true
                state.isErrorlovePro = false
            } else {
                //state.userIds.push(userID)///
                state.userIds = userID
                state.loveProItems.push(loveProItem)
            }
        },
        resetlovePro: (state) => {
            state.isSucesslovePro = false
        },

        removeloveProProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemlovePro = state?.loveProItems?.filter((item) => item?.product !== idProduct)
            const itemloveProSelected = state?.loveProItemsSelected?.filter((item) => item?.product !== idProduct)//vd 57
            state.loveProItems = itemlovePro;
            //state.userIds = '';
            state.loveProItemsSelected = itemloveProSelected;

        },
        removeAllloveProProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemlovePros = state?.loveProItems?.filter((item) => !listChecked.includes(item.product))
            const itemloveProSelected = state?.loveProItems?.filter((item) => !listChecked.includes(item.product))
            state.loveProItems = itemlovePros;
            //state.userIds = '';
            state.loveProItemsSelected = itemloveProSelected;

        },
        selectedlovePro: (state, action) => {
            const { listChecked } = action.payload
            const loveProSelected = []
            state.loveProItems.forEach((lovePro) => {
                if (listChecked.includes(lovePro.product)) {
                    loveProSelected.push(lovePro)
                }
            })
            state.loveProItemsSelected = loveProSelected

        }
    },
})

// Action creators are generated for each case reducer function
export const { addloveProProduct, removeloveProProduct, removeAllloveProProduct, selectedlovePro, resetlovePro } = loveProSlide.actions

export default loveProSlide.reducer