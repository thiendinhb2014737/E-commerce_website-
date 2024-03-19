import axios from "axios"
import { axiosJWT } from "./UserService"

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getOrderByUserId = async (id, access_token, limit, search) => {
    let res = {}
    if (search?.length > 0) {
        res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}?filter=maDH&filter=${search}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    } else {
        res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}?sort=desc&sort=createdAt&limit=${limit}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    }

    return res.data

}
export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const cancelOrder = async (id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, { data }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order?sort=desc&sort=createdAt`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const updateOrder = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteOrder = async (id, orderItems, access_token) => {
    const data = { orderItems }
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete/${id}`, { data }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const countAllOrder = async (access_token, Year) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/count-all-order?filter=createOrderdAt&filter=${Year}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getFilterOrder = async (access_token, filter) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-filter-order?filter=statusOder&filter=${filter}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getPrice = async (access_token, morth) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order?filter=createOrderdAt&filter=${morth}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getOrderMonth = async (access_token, month) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-order-month?filter=createOrderdAt&filter=${month}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const countOrderMonth = async (access_token, month) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/count-order-month?filter=createOrderdAt&filter=${month}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllOrderYear = async (access_token, Year) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order?filter=createOrderdAt&filter=${Year}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}