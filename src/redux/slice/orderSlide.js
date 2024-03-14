import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userIds: [

    ],
    orderItems: [
    ],
    orderItemsSelected: [

    ],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSucessOrder: false,
    createOrderdAt: ''
}
export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {

            const { orderItem } = action.payload
            const { userID } = action.payload
            //console.log('action.payload', userID, orderItem)
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += orderItem?.amount
                    state.isSucessOrder = true
                    state.isErrorOrder = false
                }
            } else {
                //state.userIds.push(userID)///
                state.userIds = userID
                state.orderItems.push(orderItem)
            }
        },
        resetOrder: (state) => {
            state.isSucessOrder = false
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }

        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)//vd 57
            state.orderItems = itemOrder;
            state.userIds = '';
            state.orderItemsSelected = itemOrderSelected;

        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrderSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrders;
            state.userIds = '';
            state.orderItemsSelected = itemOrderSelected;

        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                }
            })
            state.orderItemsSelected = orderSelected

        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions

export default orderSlide.reducer