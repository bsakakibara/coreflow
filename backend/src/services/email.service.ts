import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

interface SendPasswordResetEmailParams {
    to: string;
    resetToken: string;
}

export async function sendPasswordResetEmail({
    to,
    resetToken
}: SendPasswordResetEmailParams): Promise<void> {

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
        throw new Error("FRONTEND_URL não configurada.");
    }

    const resetUrl =
        `${frontendUrl}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        from: `"CoreFlow" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Recuperação de senha - CoreFlow",
        text: `
Você solicitou a recuperação da sua senha no CoreFlow.

Acesse o link abaixo para criar uma nova senha:

${resetUrl}

Este link expira em 30 minutos.

Se você não solicitou a recuperação, ignore este e-mail.
        `.trim()
    });
}