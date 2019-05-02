const Categories = require('./../models/categories.model');

//Create new Categories
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "O conteúdo de categorias não pode ser vazio"
        });
    }

    // Create a Categories
    const categories = new Categories({
        title: req.body.title || "Nenhum nome para nova categoria", 
        description: req.body.description 
    });

    // Save Categories in the database
    categories.save()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo errado ao criar a categoria"
        });
        console.log(message);
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    Categories.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo errado ao recuperar categorias"
        });
    });
};

// Find a single Categories with a categorieId
exports.findOne = (req, res) => {
    Categories.findById(req.params.categorieId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "Categoria não econtrada com o id " + req.params.categorieId
            });            
        }
        res.send(categories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Categoria não econtrada com o id " + req.params.categorieId
            });                
        }
        return res.status(500).send({
            message: "Algo errado ao recuperar a categoria com o id " + req.params.categorieId
        });
    });
};

// Update a Categories
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "O conteúdo da categoria não pode estar vazia"
        });
    }

    // Find and update Categories with the request body
    Categories.findByIdAndUpdate(req.params.categorieId, {
        title: req.body.title || "Nenhum nome para categoria", 
        description: req.body.description 
    }, {new: true})
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "Categoria não econtrada com o id " + req.params.categorieId
            });
        }
        res.send(categories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Categoria não econtrada com o id " + req.params.categorieId
            });                
        }
        return res.status(500).send({
            message: "Algo errado ao atualizar Categoria com o id " + req.params.categorieId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Categories.findByIdAndRemove(req.params.categorieId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "Categoria não econtrada com o id" + req.params.categorieId
            });
        }
        res.send({message: "Categoria deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Categoria não econtrada com o id " + req.params.categorieId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível excluir a categoria com o id" + req.params.categorieId
        });
    });
};