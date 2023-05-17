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
        game_id: { //Foreign Key
            type: DataTypes.INTEGER,
            // autoincriment: true,
            allowNull: false,
            references: {
                model: 'game',
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

    //     return QueryInterface.sequelize.query('ALTER TABLE `game_id` ADD' + 'CONSTRAINT `fk_game_id_games` FOREIGN KEY(`user_id, game_id`) REFERENCES'
    //     + 'id(`game_id`)');

    // })

);

module.exports = Comment;