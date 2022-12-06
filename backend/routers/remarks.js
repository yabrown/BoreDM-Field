const express = require('express')
const { isJwtError } = require('./jwtError');
const db = require('../queries')
const { verifyToken } = require('./verifyToken')

const router = express.Router()

router.use(verifyToken);

router.post('/get_all_remarks', async (req, res) => {
  try {
    const remark_list = await db.get_all_remarks(req.body.log_id)
    res.status(200).json(remark_list);
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      console.error(err);
      res.status(500).send();
    }
  }
})

router.post('/add_remark', async (req, res) => {
  try {
    await db.add_remark(req.body.log_id, req.body.start_depth, req.body.notes)
    res.status(200).send();
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      console.error(err);
      res.status(500).send();
    }
  }
})

module.exports = router;