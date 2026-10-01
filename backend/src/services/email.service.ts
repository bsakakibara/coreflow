interface SendPasswordResetEmailParams {
    to: string;
    resetToken: string;
}

export async function sendPasswordResetEmail({
    to,
    resetToken
}: SendPasswordResetEmailParams): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL;
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.EMAIL_FROM;

    if (!frontendUrl) {
        throw new Error("FRONTEND_URL não configurada.");
    }

    if (!apiKey) {
        throw new Error("BREVO_API_KEY não configurada.");
    }

    if (!senderEmail) {
        throw new Error("EMAIL_FROM não configurado.");
    }

    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey
        },
        body: JSON.stringify({
            sender: {
                name: "CoreFlow",
                email: senderEmail
            },
            to: [
                {
                    email: to
                }
            ],
            subject: "Recuperação de senha - CoreFlow",
            textContent: `
Você solicitou a recuperação da sua senha no CoreFlow.

Acesse o link abaixo para criar uma nova senha:

${resetUrl}

Este link expira em 30 minutos.

Se você não solicitou a recuperação, ignore este e-mail.
            `.trim()
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();

        console.error(
            `Erro ao enviar e-mail pela Brevo. Status: ${response.status}`,
            errorBody
        );

        throw new Error("Não foi possível enviar o e-mail de recuperação.");
    }
}