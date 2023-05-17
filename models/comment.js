const { query } = require('express');
const { Model, DataTypes, QueryInterface } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        comment_text: {
            type: DataTypes.TEXT('long'),// string w max length 255 char
            allowNull: false
        },
        comment_username: {
            type: DataTypes.STRING,// string w max length 255 char
            allowNull: false
        },
        user_id: { // Foreign Key
            type: DataTypes.INTEGER,
            // autoincrement: true, 
            allowNull: false,
            references: {
                model: 'user',
                 key: 'id'
            }
        },
        book_id: { //Foreign Key
            type: DataTypes.INTEGER,
            // autoincriment: true,
            allowNull: false,
            references: {
                model: 'book',
                key: 'id'
            }
        }
    },
    {
        sequelize, 
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
    // .then(() => {

    //     return QueryInterface.sequelize.query('ALTER TABLE `book_id` ADD' + 'CONSTRAINT `fk_book_id_games` FOREIGN KEY(`user_id, book_id`) REFERENCES'
    //     + 'id(`book_id`)');

    // })

);

module.exports = Comment;