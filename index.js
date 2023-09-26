const express = require('express');
const app = express();
const port = 3000;

const movies = [
  { title: 'Jaws', year: 1975, rating: 8, id: 1 },
  { title: 'Avatar', year: 2009, rating: 7.8, id: 2 },
  { title: 'Brazil', year: 1985, rating: 8, id: 3 },
  { title: 'الإرهاب والكباب', year: 1992, rating: 6.2, id: 4 }
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

// app.post('/movies/add', (req, res) => {
//   // TODO: Add code to handle movie creation
// });

// app.get('/movies/get', (req, res) => {
//   res.json({status: 200, data: movies});
// });

// app.put('/movies/edit', (req, res) => {
//   // TODO: Add code to handle movie update
// });

// app.delete('/movies/delete', (req, res) => {
//   // TODO: Add code to handle movie delete
// });

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

app.get('/movies/read/id/:id', (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movie) => movie.id == id);
  if(movie) {
    res.json({status: 200, data: movie});
  }
  else {
    res.status(404).json({status: 404, error: true, message: `the movie ${id} does not exist`});
  }
});

app.post('/movies/add', (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.year;

  if (!title || !year || !rating) {
    res.status(403).json({status: 403, error: true, message: "you cannot create a movie without providing a title and a year"});
    return "";
  }
  
  const id = movies.length + 1;
  const newMovie = {title, year, rating, id};
  movies.push(newMovie);

  res.json({status: 200, data: movies});
});

app.delete('/movies/delete/:id', (req, res) => {
  const id = req.params.id;
  const movieIdx = movies.findIndex(movie => movie.id == id);

  if (movieIdx !== -1) {
    movies.splice(movieIdx, 1);
    res.json({status: 200, data: movies});
  }
  else {
    res.status(404).json({status: 404, error: true, message: `the movie ${id} does not exist`});
  }
});

app.put('/movies/update/:id', (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movie => movie.id == id));
  if (movie) {
    const { title, rating, year } = req.query;
    if (title) {
      movie.title = title;
    }
    if (rating) {
      movie.rating = rating;
    }
    if (year) {
      movie.year = year;
    }
    res.json({ status: 200, data: movies });
  }
  else {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
