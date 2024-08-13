const mailer = require("nodemailer");

const useremail = async (email, username) => {
  const messageTemplate = `<div>
   <h2>Welcome message</h2>
    <ul>
            <li>Name : ${username}</li>
            <li>Email: ${email}</li>
        </ul>
        <div>
            <p>Dear ${username}</p>
            <p>Welcome to my first node app</p>
        </div>
</div>`;

  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    meaasge: messageTemplate,
  };

  try {
    const sentmail = await transporter.sendMail(mailOptions);
    if (sentmail) {
      console.log("mail sent succ");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { useremail };
