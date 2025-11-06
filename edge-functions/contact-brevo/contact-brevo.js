import process from "node:process";

export default async (request) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const email = url.searchParams.get("email");
  const message = url.searchParams.get("message");
  const topic = url.searchParams.get("topic");

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL_ADDRESS || process.env.FROM_EMAIL_ADDRESS;
  const FROM_EMAIL = process.env.FROM_EMAIL_ADDRESS;

  if (!BREVO_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Brevo API key not configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
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
        subject: `Contacto desde web: ${topic || "Consulta"}`,
        htmlContent: `
          <html>
            <body>
              <h2>Nuevo mensaje de contacto</h2>
              <p><strong>Asunto:</strong> ${topic || "Sin asunto"}</p>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${message}</p>
            </body>
          </html>
        `,
        textContent: `
Nuevo mensaje de contacto

Asunto: ${topic || "Sin asunto"}
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo error:", error);
      return new Response(
        JSON.stringify({ error: "Error sending email", details: error }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = { path: "/contact-brevo" };
