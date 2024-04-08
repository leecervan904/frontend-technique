// const express = require('express')
import express from 'express'
import fs from 'fs'

const app = express()

app.use((req, res, next) => {
  // 路径判断等等
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    // "Content-Type": "application/json; charset=utf-8",
  });
  // 其他操作
  next()
});

app.use(express.static('dist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
