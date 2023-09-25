const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
    res.json({status: 200, message: "ok"});
});

app.get('/time', (req, res) => {
    const currentTime = new Date.toLocalTimeString();
    res.json({status: 200, message: currentTime});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});