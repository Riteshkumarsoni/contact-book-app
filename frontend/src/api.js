let mockContacts = [
  { id: 1, name: "Ritesh Soni", email: "ritesh@example.com", phone: "9876543210" },
  { id: 2, name: "Anjali Sharma", email: "anjali@example.com", phone: "9123456780" },
  { id: 3, name: "Rahul Verma", email: "rahul@example.com", phone: "9988776655" },
  { id: 4, name: "Sana Khan", email: "sana@example.com", phone: "9001122334" },
  { id: 5, name: "Vikram Joshi", email: "vikram@example.com", phone: "9112233445" },
];

export async function fetchContacts(page = 1, limit = 3) {
  const start = (page - 1) * limit;
  const pagedContacts = mockContacts.slice(start, start + limit);
  const totalPages = Math.ceil(mockContacts.length / limit);
  return { data: { contacts: pagedContacts, totalPages } };
}

export async function addContact(contact) {
  const newId = mockContacts.length ? Math.max(...mockContacts.map(c => c.id)) + 1 : 1;
  mockContacts.push({ id: newId, ...contact });
  return { success: true };
}

export async function deleteContact(id) {
  mockContacts = mockContacts.filter(c => c.id !== id);
  return { success: true };
}
