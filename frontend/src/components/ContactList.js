import { deleteContact } from "../api";

export default function ContactList({ contacts, onDeleted }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await deleteContact(id);
    onDeleted();
  };

  return (
    <ul className="contact-list">
      {contacts.map((c) => (
        <li key={c.id} className="contact-item">
          <span>
            <strong>{c.name}</strong> - {c.email} - {c.phone}
          </span>
          <button onClick={() => handleDelete(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
