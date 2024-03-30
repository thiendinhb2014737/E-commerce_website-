import axios from "axios"

export const createContact = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/contact/create-contact`, data)
    return res.data
}
export const getAllContact = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/contact/get-all-contact?sort=desc&sort=createdAt`)
    return res.data
}
export const deleteContact = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/contact/delete-contact/${id}`)
    return res.data
}