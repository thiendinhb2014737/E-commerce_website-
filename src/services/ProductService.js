import axios from "axios"
import { axiosJWT } from "./UserService"

// export const getAllProduct = async (search, limit) => {
//     let res = {}
//     if (search?.length > 0) {
//         res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}`)
//     } else {
//         res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}&sort=desc&sort=createdAt`)
//     }
//     return res.data
// }
export const getAllProduct = async (limit) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}&sort=desc&sort=createdAt`)
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}
export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}
export const getProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}
export const getAllPriceProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-price`)
    return res.data
}

export const getProductPrice = async (fprice, page, limit) => {
    if (fprice) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=price&filter=${fprice}&limit=${limit}&page=${page}`)
        return res.data
    }
}
export const getProductGender = async (gender, page, limit) => {
    if (gender) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=gender&filter=${gender}&limit=${limit}&page=${page}`)
        return res.data
    }
}
// export const getAllProductDiscount = async (search, limit, discountEvent) => {
//     let res = {}
//     if (search?.length > 0) {
//         res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=discount&filter=${discountEvent}&filter=name&filter=${search}`)
//     } else {
//         res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=discount&filter=${discountEvent}&limit=${limit}&sort=desc&sort=createdAt`)
//     }
//     return res.data
// }

export const evaluate = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/evaluate/${id}`, data)
    return res.data
}