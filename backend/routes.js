const express = require('express');
const router = express.Router();
const db = require('./db');


// Simple validators
const isValidEmail = (s) => /^\S+@\S+\.\S+$/.test(s);
const isValidPhone = (s) => /^\d{10}$/.test(s);

// POST /contacts - add contact
router.post('/contacts', (req, res) => {
try {
const { name, email = '', phone = '', tags = '' } = req.body;
if (!name || typeof name !== 'string' || name.trim().length < 1) {
return res.status(400).json({ error: 'Name is required' });
}
if (email && !isValidEmail(email)) return res.status(400).json({ error: 'Invalid email' });
if (phone && !isValidPhone(phone)) return res.status(400).json({ error: 'Invalid phone (expect 10 digits)' });


const sql = `INSERT INTO contacts (name,email,phone,tags) VALUES (?,?,?,?)`;
db.run(sql, [name.trim(), email.trim(), phone.trim(), tags.trim()], function (err) {
if (err) return res.status(500).json({ error: err.message });
// return created contact
const newContact = { id: this.lastID, name: name.trim(), email: email.trim(), phone: phone.trim(), tags: tags.trim() };
return res.status(201).json(newContact);
});
} catch (err) {
return res.status(500).json({ error: err.message });
}
});

// GET /contacts?page=1&limit=10&search=jo
router.get('/contacts', (req, res) => {
try {
const page = Math.max(1, parseInt(req.query.page || '1'));
const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '10')));
const offset = (page - 1) * limit;
const search = (req.query.search || '').trim();


let countSql = 'SELECT COUNT(*) as count FROM contacts';
let dataSql = 'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?';
const params = [limit, offset];


if (search) {
const like = `%${search}%`;
countSql = 'SELECT COUNT(*) as count FROM contacts WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR tags LIKE ?';
dataSql = 'SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR tags LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
params.unshift(like, like, like, like); // add before limit/offset
}


db.get(countSql, search ? [ `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%` ] : [], (err, row) => {
if (err) return res.status(500).json({ error: err.message });
const total = row ? row.count : 0;


db.all(dataSql, params, (err2, rows) => {
if (err2) return res.status(500).json({ error: err2.message });
return res.json({ data: rows, page, limit, total });
});
});
} catch (err) {
return res.status(500).json({ error: err.message });
}
});

// DELETE /contacts/:id
router.delete('/contacts/:id', (req, res) => {
const id = parseInt(req.params.id);
if (!id) return res.status(400).json({ error: 'Invalid id' });
db.run('DELETE FROM contacts WHERE id = ?', [id], function (err) {
if (err) return res.status(500).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
return res.status(204).send();
});
});


module.exports = router;