module.exports = (app) => {
    const categories = require('./../controllers/categories.controller');

    // Create a new categories
    app.post('/almoxarifado/categories/new', categories.create);

    // Retrieve all categories
    app.get('/almoxarifado/categories/all', categories.findAll);

    // Retrieve a single categorie with categorieId
    app.get('/almoxarifado/categories/:categorieId', categories.findOne);

    // Update a Note with categorieId
    app.put('/almoxarifado/categories/update/:categorieId', categories.update);

    // Delete a Note with categorieId
    app.delete('/almoxarifado/categories/delete/:categorieId', categories.delete);
}