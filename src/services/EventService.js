import axios from "axios"

export const createEvent = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/event/create-event`, data)
    return res.data
}
export const UpdateEvent = async (id, data) => {
    console.log('first', id, ' aaaaa', data)
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/event/update-event/${id}`, data)
    return res.data
}
export const getEvent = async (limitEvent) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/event/get-event?limit=${limitEvent}&sort=desc&sort=createdAt`)
    return res.data
}
export const getEventById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/event/get-event-id/${id}`)
    return res.data
}
export const getAllEvent = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/event/get-all-event?sort=desc&sort=createdAt`)
    return res.data
}
export const deleteEvent = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/event/delete-event/${id}`)
    return res.data
}