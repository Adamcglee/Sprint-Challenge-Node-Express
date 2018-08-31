const express = require('express');

const actionDB = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    actionDB.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The action information could not be retrieved."})
        })
})

router.post('/', (req, res) => {
    const action = req.body;
    actionDB.insert(action)
        .then(() => {
            actionDB.get()
                .then(action => {
                    res.status(201).json(action)
                })
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "There was an error while saving the action to the database."})
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    actionDB.remove(id)
        .then(count => {
            if(count) {
                res.status(201).end()
            } else {
                res.status(404).json({ message: "No action with this ID was foound."})
            }
        })
        .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
    actionDB.update(req.params.id, req.body)
        .then(action => {
            if(action) {
                res.status(200).json(action)
            } else{
                res.status(404).json({ message: "No action with this ID was found."})
            }
        })
        .catch(err => res.status(500).json({ message: "Update failed."}))
})

module.exports = router;