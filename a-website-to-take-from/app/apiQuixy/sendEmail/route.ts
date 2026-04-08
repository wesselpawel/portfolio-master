import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
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
    from: `centrumbiznesu.quixy@gmail.com`,
    to: `${email}`,
    subject: `Quixy - Dziękujemy za dołączenie do newslettera`,
    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 10px;
      ">
        <img src="https://firebasestorage.googleapis.com/v0/b/reklamy-figurscy.appspot.com/o/quixy-logo.png?alt=media&token=9b5c5a56-2ba7-4e7f-8911-8ad59393baad" alt="Logo Quixy" style="width: 100px; height: auto;"/>
      
        <h1 style="
          font-weight: bold;
          font-size: 20px;
          color: #333;
        ">Cześć, tu zespół <b style="color:orange;">
        Quixy.pl!
        </b>
        </h1>
        <p style="
          font-size: 16px;
          color: #666;
        ">Dziękujemy, że zapisałeś się do newslettera!</p>
        <p style="
          font-size: 16px;
          color: #666;
        ">Jesli to nie Ty zgłosiłeś się do newslettera, zignoruj tą wiadomość...</p>
        <p style="
          font-size: 16px;
          color: orange;
        ">Pozdrawiamy, Zespół Quixy!</p>

      </div>
    `,
  });

  return NextResponse.json({ message: info });
}
