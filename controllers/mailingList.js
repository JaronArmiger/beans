const MailingList = require('../models/mailingList');
const slugify = require('slugify');

exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    const mailingList = await MailingList.find({ slug });
    res.json({
      mailingList,
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.create = async (req, res) => {
  try {
    const { listName } = req.body;

    const mailingList = await new MailingList({
      listName,
      slug: slugify(listName),
    });
    await mailingList.save();
    res.json({
      ok: true,
      listName: mailingList.listName,
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.addEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { slug } = req.params;

    const mailingList = await MailingList.findOneAndUpdate({
      slug,
    }, {
      $push: {
        emails: email
      }
    }, {
      new: true
    });

    res.json({
      ok: true,
      mailingList,
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.removeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { slug } = req.params;

    const mailingList = await MailingList.findOneAndUpdate({
      slug,
    }, {
      $pull: {
        emails: email
      }
    }, {
      new: true
    });

    res.json({
      ok: true,
      mailingList,
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await MailingList.findOneAndDelete({
      slug: req.params.slug
    });
    res.json({
      deleted,
      ok: true
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
}