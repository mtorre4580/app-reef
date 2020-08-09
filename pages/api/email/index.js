import nextConnect from 'next-connect';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.API_KEY_SENDGRID);

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    // const { text, subject, to } = req.body;
    // const msg = {
    //   to,
    //   from: process.env.SENDGRID_FROM,
    //   subject,
    //   text,
    // };
    // await sgMail.send(msg);
    res.status(200).json({ msg: 'Mail send' });
  } catch (err) {
    res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
