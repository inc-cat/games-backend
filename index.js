// const app = require('./app');

// const port = 3000;
// app.listen(port, () => {
//     console.log(`It's running on ${port}`);
// });

const app = require('./app.js');
const { PORT = 9090 } = process.env;

app.listen(PORT, function () {
    return console.log(`Listening on ${PORT}...`);
});
