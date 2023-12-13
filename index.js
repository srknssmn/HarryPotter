import express from "express";
import path from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

// Middlewares
app.use(express.static(__dirname + "/public"))
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/audio', express.static('audio'));
app.use('/constants', express.static('constants'));

app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

const port = 3000

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});