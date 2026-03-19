const Guest = require('../models/guestModel');

exports.listGuests = (req, res) => {
    Guest.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.checkIn = (req, res) => {
    const { id, status } = req.body;
    Guest.updateStatus(id, status, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status atualizado com sucesso" });
    });
};