import process from "node:process";

export default async (request) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID || "2"; // Default list ID

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

  let email;
  
  try {
    const body = await request.json();
    email = body.email;
    
    if (!email || email === "") {
      return new Response(
        JSON.stringify({ 
          status: "error",
          error: "Missing email" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Subscribing email to Brevo list:", email);
    
  } catch (e) {
    console.error("Error parsing request:", e);
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: "Invalid request body" 
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Añadir contacto a Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(BREVO_LIST_ID)],
        updateEnabled: false, // No actualizar si ya existe
      }),
    });

    const data = await response.json();

    // Si el contacto ya existe, Brevo devuelve 400 con code: "duplicate_parameter"
    if (!response.ok) {
      if (data.code === "duplicate_parameter") {
        console.log("Contact already exists:", email);
        return new Response(
          JSON.stringify({ 
            status: "subscribed",
            message: "Already subscribed",
            email: email
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      console.error("Brevo API error:", data);
      return new Response(
        JSON.stringify({ 
          status: "error",
          error: "Error subscribing to newsletter",
          details: data
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Successfully subscribed:", email);
    return new Response(
      JSON.stringify({ 
        status: "pending",
        message: "Successfully subscribed",
        email: email,
        id: data.id
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

export const config = { path: "/api/subscribe-brevo" };
