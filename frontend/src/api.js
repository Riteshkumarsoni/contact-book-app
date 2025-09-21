import axios from "axios";

const API = axios.create({
  baseURL: "https://contact-book-app-4vmv.onrender.com", // backend URL
});

export const fetchContacts = (page = 1) =>
  API.get(`/contacts?page=${page}&limit=5`);

export const addContact = (contact) => API.post("/contacts", contact);

export const deleteContact = (id) => API.delete(`/contacts/${id}`);
