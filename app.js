const { projects } = require('./data.json')

const express = require('express');
const app = express();

app.use('/static',express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    res.locals.project = projects[id];
    res.render('project');
})

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
app.use((err, req, res, next) => {
res.locals.error = err;
res.render('error');
});

  const PORT = 3000;
  app.listen(PORT, () => {
      console.log(`The application is running on localhost:${PORT}!`)
  });