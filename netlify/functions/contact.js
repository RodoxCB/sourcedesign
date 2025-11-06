const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { nome, empresa, telefone, email, mensagem, recaptcha } = JSON.parse(event.body);

    // Server-side validation
    const errors = [];

    if (!nome || nome.length < 2) errors.push('Nome deve ter pelo menos 2 caracteres');
    if (!telefone || !/^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/.test(telefone.replace(/\D/g, ''))) {
      errors.push('Telefone inválido. Use o formato (11) 99999-9999');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('E-mail inválido');
    if (!mensagem || mensagem.length < 10) errors.push('Mensagem deve ter pelo menos 10 caracteres');

    // Verify reCAPTCHA if provided
    if (recaptcha) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      });

      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) {
        errors.push('Verificação de segurança falhou');
      }
    }

    if (errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors })
      };
    }

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'contato@sourcedesign.com.br',
      subject: `Novo contato de ${nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Novo contato via formulário</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Empresa:</strong> ${empresa || 'Não informado'}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>E-mail:</strong> ${email}</p>
          </div>
          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0;">Mensagem:</h3>
            <p style="white-space: pre-wrap;">${mensagem}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Enviado em: ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      `
    });

    // Create WhatsApp link (but don't auto-open)
    const whatsappMessage = encodeURIComponent(
      `Novo contato: ${nome} - ${telefone} - ${email}\n\n${mensagem}`
    );
    const whatsappUrl = `https://wa.me/5527996019833?text=${whatsappMessage}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        whatsappUrl,
        message: 'Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.'
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno do servidor' })
    };
  }
};
