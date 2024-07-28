require('dotenv').config();
var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

const db = require('../database');

// 쿼리 실행 예제

router.get('/', (req, res, next) => {
    const rows = db.runQuery('SELECT * FROM bible');
    
	res.render('home', { 
        verses: rows
     });
}) 

module.exports = router;