import { useEffect, useState } from "react";
import { fetchContacts } from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadContacts = async () => {
    const res = await fetchContacts(page);
    setContacts(res.data.contacts);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    loadContacts();
  }, [page]);

  return (
    <div className="app">
      <h1>📒 Contact Book</h1>
      <ContactForm onAdded={loadContacts} />
      <ContactList contacts={contacts} onDeleted={loadContacts} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default App;
