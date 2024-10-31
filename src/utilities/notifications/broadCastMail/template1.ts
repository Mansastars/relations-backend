import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
export const template1 = async (
    replyTo: string,
    to: string,
    subject: string,
    body: string,
    address: string,
    name: string,
    phone_number: string,
  ) => {
    try {
      // Check if 'to' is provided
      if (!to) {
        throw new Error('Recipient email address is missing');
      }
  
      const response = await transport.sendMail({
        from: `${process.env.GMAIL_USER}`,
        to,
        replyTo,
        subject,
        html: `
          
        ${body}
    <!-- Footer section -->
    <div
      style="
        background-color: #1a1d32;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      "
    >
      <p style="margin: 0; font-size: 14px; color: #ffffff;">${name}</p>
      <p style="margin: 0; font-size: 14px; color: #ffffff;">${address}</p>
      <p style="margin: 0; font-size: 14px;">
        <a
          href="tel:${phone_number}"
          style="color: #ffffff; text-decoration: none;"
        >
          ${phone_number}
        </a>
      </p>

      <!-- Powered by section -->
      <table
        role="presentation"
        style="
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        "
      >
        <tr>
          <td style="text-align: center;">
            <span style="color: #ffffff;">Powered by</span>
            <a
              href="https://crm.mansastars.com/auth/sign_up"
              style="text-decoration: none; display: inline-block; vertical-align: middle;"
            >
              <img
                src="https://crm.mansastars.com/assets/MansaLogo-B4u3uUZv.png"
                alt="MansaStars"
                width="30"
                height="30"
                style="vertical-align: middle;"
              />
            </a>
          </td>
        </tr>
      </table>

      <!-- Unsubscribe section -->
      <p
        style="
          margin: 10px 0 0;
          color: #ffffff;
          font-size: 10px;
        "
      >
        <a
          href="${process.env.DOMAIN}/${to}"
          style="color: #ffffff; text-decoration: none;"
        >
          Unsubscribe
        </a>
      </p>
    </div>
  </div>


 `,});
  
 console.log(response)
      return response; // Optionally return response for further handling
    } catch (err: any) {
      console.log(err.message);
    }
  };
  
