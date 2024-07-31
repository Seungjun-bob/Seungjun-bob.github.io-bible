require('dotenv').config();
var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const logger = require('../logger');

const db = require('../database');

// 쿼리 실행 예제

router.get('/', async (req, res, next) => {
    // 접속 자의 IP 주소를 가져옵니다, 접속 시간도 함께 로깅합니다.
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const time = new Date().toISOString();
    logger.info(`[${time}] ${ip} GET /`);

    const rows = await db.runQuery('SELECT * FROM bible');

	res.render('home', { 
        verses: rows
     });
}) 

module.exports = router;