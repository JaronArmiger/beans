const express = require('express');
const router = express.Router();

const {
  read,
  create,
  addEmail,
  removeEmail,
  remove,
} = require('../controllers/mailingList');

router.get(
  '/mailing-list/:slug',
  read
);

router.post(
  '/mailing-list',
  create
);

router.put(
  '/mailing-list/:slug/add',
  addEmail
);

router.put(
  '/mailing-list/:slug/remove',
  removeEmail
);

router.delete(
  '/mailing-list/:slug',
  remove
);

module.exports = router;