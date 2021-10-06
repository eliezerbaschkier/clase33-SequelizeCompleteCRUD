const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll()
            .then((allGenres) => {
                res.render('moviesAdd', {allGenres});
            })
            .catch((error) => {
                console.log(error);
            });
    },
    create: function (req,res) {
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        })
            .then(() => {
                res.redirect('/movies');
            })
            .catch((error) => {
                console.log(error);
            });
    },
    edit: function(req,res) {
        let moviePromise = db.Movie.findByPk(req.params.id, {
            include: ['genres']
        });

        let genresPromise = db.Genre.findAll();

        Promise.all([moviePromise, genresPromise])
            .then(([Movie, allGenres]) => {
                let d = Movie.release_date;
                let datestring = d.getFullYear().toString() + '-' +
                                (d.getMonth()+1).toString().padStart(2, '0') + '-' +
                                d.getDate().toString().padStart(2, '0');
                console.log(datestring);
                res.render('moviesEdit', {Movie, allGenres, datestring});
            })
            .catch((error) => {
                console.log(error);
            });
    },
    update: function (req,res) {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        },{
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect('/movies');
            })
            .catch((error) => {
                console.log(error);
            });
    },
    delete: function (req,res) {
        db.Movie.findByPk(req.params.id)
            .then((Movie) => {
                res.render('moviesDelete', {Movie});
            })
            .catch((error) => {
                console.log(error);
            });
    },
    destroy: function (req,res) {
        db.Movie.destroy({
            where: {
                id : req.params.id
            }
        })
            .then(() => {
                res.redirect('/movies');
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = moviesController;