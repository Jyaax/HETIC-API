const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/generate-pdf", (req, res) => {
  const { type } = req.body;

  const doc = new PDFDocument();

  const filePath = `public/generated-pdfs/${type}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.text(`Contenu du document ${type}`);

  doc.end();
  writeStream.on("finish", () => {
    res.json({ url: `/generated-pdfs/${type}.pdf` });
  });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
