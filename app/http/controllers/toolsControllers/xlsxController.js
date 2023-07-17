const express = require("express");
const xlsx = require("xlsx");

const upload = (req, res) => {
//   const file = req.files["file"];
//  const filePath = req.file.path;
  console.log(req.files);
   console.log(req.body);
//   const wb = xlsx.readFile(file.name, { cellDates: true });
//   const ws = wb.Sheets["Sheet1"];
//   const data = xlsx.utils.sheet_to_json(ws);
//   console.log(data);

//   res.status(200).end(xlsx.utils.sheet_to_csv(ws));
};

//>---------- module exports

module.exports = { upload };
