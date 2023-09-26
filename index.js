const express = require('express');
const app = express();
const port = 3000;

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
];

app.get('/test', (req, res) => {
    res.json({status: 200, message: "ok"});
});

app.get('/time', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.json({status: 200, message: currentTime});
});

app.get('/hello/:id', (req, res) => {
  const id = req.params.id;
  if (id == "") {
    id = "world";
  }
  res.json({status: 200, message: `Hello, ${ id }`});
});

app.get('/search', (req, res) => {
  const search = req.query.s;
  if (search) {
    res.status(200).json({status: 200, message: 'ok', data: search});
  } else {
    res.status(500).json({status: 500, error: true, message: 'you have to provide a search'});
  }
});

app.post('/movies/add', (req, res) => {
  // TODO: Add code to handle movie creation
});

app.get('/movies/get', (req, res) => {
  res.json({status: 200, data: movies});
});

app.put('/movies/edit', (req, res) => {
  // TODO: Add code to handle movie update
});

app.delete('/movies/delete', (req, res) => {
  // TODO: Add code to handle movie delete
});

app.get('/movies/read/by-date', (req, res) => {
  const moviesByDate = movies.sort((a, b) => a.year - b.year);
  res.json({status: 200, data: moviesByDate});
});

app.get('/movies/read/by-rating', (req, res) => {
  const moviesByRating = movies.sort((a, b) => b.rating - a.rating);
  res.json({status: 200, data: moviesByRating});
});

app.get('/movies/read/by-title', (req, res) => {
  const moviesByTitle = movies.sort((a, b) => a.title.localeCompare(b.title));
  res.json({status: 200, data: moviesByTitle});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
