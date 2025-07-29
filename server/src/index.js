const app = require('./app.js');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('the app is running goooooood', PORT);
})