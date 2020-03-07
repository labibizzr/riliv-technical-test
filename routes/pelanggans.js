const express = require('express')
const router = express.Router()

// Model import
const Pelanggan = require('../models/Pelanggan')


// create data pelanggan
router.post('/',  async (req,res) => {

    console.log(req.body)

    var nama = req.body.nama
    var umur = req.body.umur
    var no_hp = req.body.no_hp
    
    const new_user = Pelanggan.build({
      nama : nama,
      umur : umur,
      tanggal_daftar : Date(Date.now()),
      no_hp : no_hp
    })
  
    await new_user.save()
      .then(() => {
          console.log("finished")
          res.send("ok")
        })
      .catch(err => {
        console.error('error ' + err)
        res.send("not ok")
      })
  })

  router.get('/', async(req,res) => {
      
    Pelanggan.findAll().then( pelanggans =>{
        console.log(pelanggans)
        res.json(pelanggans)
    })
    .catch(err => res.send(err))
  })
  
  // input id pelanggan untuk diedit. Lalu data taruh di json request
  router.put('/:id_pelanggan', async(req,res) => {

    var id_pelanggan = req.params.id_pelanggan

    var pelanggan = await Pelanggan.findOne({ where : { id :id_pelanggan }})

    if (pelanggan == null){
      res.send("no pelanggan found")
    }
    else{
      // console.log(pelanggan)
      var body = req.body
      console.log(`body: ${body}`)

        pelanggan.nama = body.nama
        pelanggan.umur = body.umur
        pelanggan.no_hp = body.no_hp
        pelanggan.tanggal_daftar = body.tanggal_daftar
      
      await pelanggan.save().then(() => {
        res.send("update successful")
      })
      .catch(err => res.send(err))
    }
  })

  // input id pelanggan untuk dihapus
  router.delete('/:id_pelanggan', async (req,res) => {
    
    var id_pelanggan = req.params.id_pelanggan;

    var pelanggan = await Pelanggan.findOne({ where : { id :id_pelanggan }})
    if(pelanggan == null){
      res.send("Pelanggan not found")
    }
    else{
      await pelanggan.destroy().then(() => res.json({message : "Pelanggan deleted"}))
      .catch(err => res.status(400).json({error : err}))
    }

  })
  module.exports = router