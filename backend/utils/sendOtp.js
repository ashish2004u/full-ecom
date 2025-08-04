import nodemailer from "nodemailer";

const sendOtp = async (email, otp) => {
  console.log(`🔐 Trying to send OTP to ${email}: ${otp}`);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Style Squad" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Style Squad - OTP Verification",
      text: `Hello,\n\nYour OTP is ${otp}. It will expire in 2 minutes.\n\nThank you,\nStyle Squad Team`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
          <p>Hello,</p>
          <p>Your OTP is <strong>${otp}</strong>.</p>
          <p>This OTP will expire in 2 minutes.</p>
          <br/>
          <p>Thanks,<br/>Style Squad Team</p>
        </div>
      `,
      headers: {
        "X-Priority": "1", // High priority
        "X-Mailer": "Nodemailer",
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response);
  } catch (error) {
    console.error("❌ Email error: ", error.message);
  }
};

export default sendOtp;
