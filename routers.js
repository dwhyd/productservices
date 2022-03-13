const express = require("express");
const routers = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

routers.get("/", (req, res) => {
  const home = "home.html";
  res.sendFile(path.join(__dirname, home));
});
routers.get("/gallery", (req, res) => {
  //const gambar = "public/penjualan.PNG";
  //res.download(path.join(__dirname, gambar), "gambar-utama.png");
res.send(<h1>Gallery</h1>)
});
routers.get("/unduh", (req, res) => {
 // const penjualan = "/public/penjualan.PNG";

  //res.download(path.join(__dirname, penjualan));
res.send(<h1>Unduhan</h1>)
});
const upload = multer({ dest: "public" });
routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.send(`File ${file.originalname} berhasil di upload`);
  } else {
    res.send(`file gagal di uplad`);
  }
});

const multiupload = multer({ dest: "public" });
routers.post("/multiupload", multiupload.array("files", 4), (req, res) => {
  const files = req.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const target = path.join(__dirname, "public", files[i].originalname);
      fs.renameSync(files[i].path, target);
      res.send(`sukses upload ${files[i].originalname}`);
      // res.end()
    }
  } else {
    res.send(`files gagal di upload`);
  }
  console.log(files.length);
  res.end();
});

// CRUD
// import client untuk koneksi
// const client = require("./connection");
// const ObjectId = require("mongodb").ObjectId;
//menggunakan database latihan
// const db = client.db("latihan");

// ! CRUD menggunakan mongoose
require("./connection");
const Product = require("./Product");
const Account = require("./Account");



routers.get("/product", async (req, res) => {
  const product = await Product.find();
  if (product.length > 0) {
    res.send({
      status: "success",
      message: "List product: ",
      data: product,
    });
  } else {
    res.send("data tidak ada");
  }
});

routers.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send({
      status: "success",
      message: "single product ditemukan :",
      data: product,
    });
  } else {
    res.send({
      status: "warning",
      message: "single product tidak ditemukan",
    });
  }
});

routers.post("/product", multer().none(), async (req, res) => {
  const { nama, harga, stok, status } = req.body;
  try {
    const product = await Product.create({
      nama: nama,
      harga: harga,
      stok: stok,
    });
    if (product) {
      res.send({
        status: "success",
        message: "berhasil menambahkan product :",
        data: product,
      });
    } else {
      res.send({
        status: "warning",
        message: "gagal menambahkan product",
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});
routers.put("/product/:id", multer().none(), async (req, res) => {
  const { nama, harga, stok, status } = req.body;
  try {
    const product = await Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          nama: nama,
          harga: harga,
          stok: stok,
        },
      }
    );
    if (product) {
      res.send({
        status: "success",
        message: "data product telah terupdate",
        data: product,
      });
    } else {
      res.send({
        status: "warning",
        message: "data gagal di update",
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});
routers.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.deleteOne({
      _id: req.params.id,
    });
    if (product) {
      res.send({
        status: "sukses",
        message: "data telah dihapus",
        data: product,
      });
    } else {
      res.send({
        status: "warning",
        message: "data gagal di hapus",
      });
    }
  } catch (error) {
    res.send({
      status: "warning",
      message: error.message,
    });
  }
});

module.exports = routers;
