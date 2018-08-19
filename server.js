const express = require('express');
const path = require('path');

const PORT = 8080;
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`server started on http://localhost:${PORT}/`);
});
