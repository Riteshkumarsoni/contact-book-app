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
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await fetchContacts(page);
      const data = res.data || res; // adjust to API response
      setContacts(data.contacts || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to load contacts:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [page]);

  return (
    <div className="app">
      <h1>📒 Contact Book</h1>
      <ContactForm onAdded={loadContacts} />
      <ContactList contacts={contacts} onDeleted={loadContacts} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default App;
