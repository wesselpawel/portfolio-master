import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const verificationCode = req.nextUrl.searchParams.get("verificationCode");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `noreply@quixy.pl`,
    to: `${email}`,
    subject: `Quixy - Potwierdzenie rejestracji`,
    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 10px;
      ">
        <h1 style="
          font-weight: bold;
          font-size: 20px;
          color: #333;
        ">Cześć, tu zespół Quixy.pl!</h1>
        <p style="
          font-size: 16px;
          color: #666;
        ">Kliknij w poniższą linię, aby potwierdzić swoje konto.</p>
        <a style="
          font-size: 16px;
          color: #007bff;
          text-decoration: none;
        " href="https://quixy.pl/verify/${verificationCode}">https://quixy.pl/verify/${verificationCode}</a>
      </div>
    `,
  });

  return NextResponse.json({ message: info });
}
