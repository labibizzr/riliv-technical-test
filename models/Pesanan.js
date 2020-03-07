const Sequelize = require('sequelize')
const db = require('../config/database')


const Pesanan = db.define('pesanan', {
        id_pelanggan: {
            type: Sequelize.STRING
        },
        
        tanggal_pesanan :{
            type:Sequelize.DATE
        },
        total_harga :{
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
    })


module.exports = Pesanan