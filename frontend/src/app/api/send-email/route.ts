import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      to, 
      subject, 
      text, 
      html, 
      smtpHost, 
      smtpPort, 
      smtpUser, 
      smtpPass, 
      smtpSecure 
    } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { success: false, error: "Recipient (to) and Subject are required." },
        { status: 400 }
      );
    }

    // Determine SMTP configuration: Request body -> Environment variables -> Ethereal test fallback
    const host = smtpHost || process.env.SMTP_HOST;
    const user = smtpUser || process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = smtpPass || process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const port = Number(smtpPort || process.env.SMTP_PORT || 587);

    let transporter;
    let isEthereal = false;

    if (host && user && pass) {
      // Use real configured SMTP server (Gmail, Outlook, SendGrid, AWS SES, Ethereal ESMTP, etc.)
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: smtpSecure !== undefined ? smtpSecure : port === 465,
        auth: {
          user,
          pass,
        },
      });
    } else {
      // Auto-generate free Ethereal ESMTP test account if no real SMTP credentials provided
      console.log("No SMTP credentials provided. Creating Ethereal test email account...");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      isEthereal = true;
    }

    const mailOptions = {
      from: `IndusBrain AI Enterprise <${process.env.SMTP_SENDER || user || "no-reply@indusbrain.ai"}>`,
      to,
      subject,
      text: text || subject,
      html: html || `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563EB;">IndusBrain AI Enterprise Notification</h2>
        <p>${(text || "").replace(/\n/g, "<br/>")}</p>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"/>
        <p style="font-size: 12px; color: #777;">This is an automated message from the IndusBrain AI Enterprise Onboarding & Governance Platform.</p>
      </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    const previewUrl = isEthereal ? nodemailer.getTestMessageUrl(info) : null;

    console.log("Email sent successfully! MessageId:", info.messageId);
    if (previewUrl) {
      console.log("Ethereal preview URL:", previewUrl);
    }

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      isEthereal,
      previewUrl,
      message: isEthereal 
        ? "Sent via Ethereal test SMTP. View preview link to inspect actual email."
        : `Email dispatched successfully to ${to} via SMTP (${host || "configured mailer"}).`
    });

  } catch (error: any) {
    console.error("SMTP Email Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email via SMTP." },
      { status: 500 }
    );
  }
}
