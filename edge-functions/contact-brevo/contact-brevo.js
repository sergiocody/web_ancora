import process from "node:process";

export default async (request) => {
  // Leer datos del body JSON
  let name, email, message, topic, phone;
  
  try {
    const body = await request.json();
    name = body.name;
    email = body.email;
    message = body.message;
    
    // Extraer información del mensaje formateado
    const topicMatch = message.match(/Topic:\s*([^\r\n]+)/);
    const phoneMatch = message.match(/Phone:\s*([^\r\n]+)/);
    const messageMatch = message.match(/Message:\s*\r?\n([\s\S]*)/);
    
    topic = topicMatch ? topicMatch[1].trim() : "Consulta";
    phone = phoneMatch ? phoneMatch[1].trim() : "";
    const cleanMessage = messageMatch ? messageMatch[1].trim() : message;
    
    console.log("Contact form data:", { name, email, topic, phone });
    
  } catch (e) {
    console.error("Error parsing request:", e);
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: "Invalid request body",
        details: e.message 
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL_ADDRESS || process.env.FROM_EMAIL_ADDRESS;
  const FROM_EMAIL = process.env.FROM_EMAIL_ADDRESS;

  if (!BREVO_API_KEY) {
    console.error("BREVO_API_KEY not configured");
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: "Brevo API key not configured" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  
  if (!FROM_EMAIL || !TO_EMAIL) {
    console.error("Email addresses not configured");
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: "Email addresses not configured" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    console.log("Sending email via Brevo API...");
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: name || "Website Contact",
          email: FROM_EMAIL,
        },
        to: [
          {
            email: TO_EMAIL,
            name: "Ancora Grupo Vocal",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `Contacto web: ${topic}`,
        htmlContent: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background-color: #f4f4f4; padding: 20px; border-bottom: 3px solid #333; }
                .content { padding: 20px; }
                .info { background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #333; }
                .label { font-weight: bold; color: #666; }
              </style>
            </head>
            <body>
              <div class="header">
                <h2>📧 Nuevo mensaje de contacto</h2>
              </div>
              <div class="content">
                <div class="info">
                  <p><span class="label">Asunto:</span> ${topic}</p>
                  <p><span class="label">Nombre:</span> ${name}</p>
                  <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                  ${phone ? `<p><span class="label">Teléfono:</span> ${phone}</p>` : ''}
                </div>
                <div>
                  <h3>Mensaje:</h3>
                  <p>${message.replace(/\r?\n/g, '<br>')}</p>
                </div>
              </div>
            </body>
          </html>
        `,
        textContent: message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo API error:", error);
      return new Response(
        JSON.stringify({ 
          status: "error",
          error: "Error sending email", 
          details: error 
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Email sent successfully via Brevo");
    return new Response(
      JSON.stringify({ 
        status: "ok",
        message: "Email sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: "Internal server error", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = { path: "/contact-brevo" };
