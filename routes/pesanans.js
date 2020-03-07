const express = require('express')
const router = express.Router()

// Model import
const Pesanan = require('../models/Pesanan')
const Pelanggan = require('../models/Pelanggan')

router.get('/pelanggan/:id_pelanggan', async (req,res) => {
    var id_pelanggan = req.params.id_pelanggan
    
    var pelanggan = await Pelanggan.findOne({ where : { id :id_pelanggan }, include : Pesanan})
    
        if(pelanggan == null){
            res.json({message : "No Pelanggan found"})
        }
        else{
            // var pesanan = `ayaya`
            console.log(pelanggan.pesanan)
            res.json(pelanggan.pesanans)
        }
})

router.get('/', async (req,res) => {
    // res.send('ayaya')
    var pesanan = await Pesanan.findAll()

    res.json(pesanan)
})

router.post('/',async (req,res) =>{

    console.log(req.body)

    var id_pelanggan = req.body.id_pelanggan
    var tanggal_pesanan = req.body.tanggal_pesanan
    var total_harga = req.body.total_harga
    
    const pesanan = Pesanan.build({
      id_pelanggan : id_pelanggan,
      tanggal_pesanan : tanggal_pesanan,
      total_harga : total_harga,
    })
  
    await pesanan.save()
      .then(() => {
          console.log("finished")
          res.send("ok")
        })
      .catch(err => {
        console.error('error ' + err)
        res.send("not ok")
      })

})

router.put('/:id_pesanan', async(req,res) => {

    var id_pesanan = req.params.id_pesanan

    var pesanan = await Pesanan.findOne({ where : { id :id_pesanan }})

    if (pesanan == null){
      res.send("no pelanggan found")
    }
    else{
      // console.log(pelanggan)
      var body = req.body
      console.log(`body: ${body}`)
      
        pesanan.tanggal_pesanan = body.tanggal_pesanan
        pesanan.total_harga = body.total_harga
        pesanan.id_pelanggan = body.id_pelanggan

      await pesanan.save().then(() => { 
        res.send("update successful")
      })
      .catch(err => res.send(err))
    }
  })

router.delete('/:id_pesanan', async(req,res) => {

  var id_pesanan = req.params.id_pesanan;

  var pesanan = await Pesanan.findOne({ where : { id :id_pesanan }})
  if(pesanan == null){
    res.send("Pelanggan not found")
  }
  else{
    await pesanan.destroy().then(() => res.json({message : "Pelanggan deleted"}))
    .catch(err => res.status(400).json({error : err}))
  }

})


module.exports = router




