import { deleteContact } from "../api";

export default function ContactList({ contacts, onDeleted, loading }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await deleteContact(id);
    onDeleted();
  };

  const placeholders = [
    { id: 1, name: "Ritesh Soni", email: "ritesh@example.com", phone: "8542514578" },
    { id: 2, name: "Anjali sharma...", email: "anjali@example.com", phone: "9954845745" },
    { id: 3, name: "Ritu Raj", email: "ritu@example.com", phone: "8452142589" },
  ];

  const displayContacts = loading ? placeholders : contacts;

  return (
    <ul className="contact-list">
      {displayContacts.map((c) => (
        <li key={c.id} className="contact-item">
          <span>
            <strong>{c.name}</strong> - {c.email} - {c.phone}
          </span>
          {!loading && <button onClick={() => handleDelete(c.id)}>Delete</button>}
        </li>
      ))}
    </ul>
  );
}
