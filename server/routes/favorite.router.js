const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM favorites ORDER BY "search_word" ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post('/', (req, res) => {
  const favoriteData = req.body;
  console.log(favoriteData)
  const queryText = `INSERT INTO favorites ("source_url", "search_word", "category_id")
                    VALUES ($1, $2, $3)`;
  const queryValues = [
    favoriteData.source_url,
    favoriteData.search_word,
    favoriteData.category_id,
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error posting favorite query', error);
      res.sendStatus(500);
    });
});


// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
