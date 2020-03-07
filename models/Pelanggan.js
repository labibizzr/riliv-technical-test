const Sequelize = require('sequelize')
const db = require('../config/database')
const Pesanan = require('./Pesanan')

const Pelanggan = db.define('pelanggan', {
        nama: {
            type: Sequelize.STRING
        },
        tanggal_daftar: {
            type: Sequelize.DATE
        },
        umur :{
            type:Sequelize.INTEGER
        },
        no_hp :{
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
    })

    Pelanggan.hasMany(Pesanan,{
        foreignKey : 'id_pelanggan'
    })
    Pesanan.belongsTo(Pelanggan, {
        foreignKey : 'id_pelanggan'
    })
module.exports = Pelanggan