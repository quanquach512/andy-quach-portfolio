import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, subject, message } = body

    const data = await resend.emails.send({
      from: "Andy Portfolio <contact@contact.andyquach.dev>",
      to: "qmquan90@gmail.com",
      replyTo: email,
      subject: subject || "New Contact Form Message",
      html: `
        <h3>New message from portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
      text: `New message from portfolio\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    console.log("Resend response:", data)
    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}