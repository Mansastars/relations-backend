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
    logo: string,
    phone_number: string,
    customer_name?: string
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
          <div
  style="margin: 0; padding: 0; width: 100%; background-color: #f2f3ff; font-family: Arial, sans-serif;"
>
  <!-- Wrapper to center the content -->
  <div
    style="
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
    "
  >
    <!-- Header section -->
    <div
      style="
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
      "
    >
      <img
        src="${logo? logo:"https://crm.mansastars.com/assets/MansaLogo-B4u3uUZv.png"}"
        alt="Respondent's Logo"
        width="100"
        height="100"
        style="border-radius: 50%; display: block; margin: 0 auto;"
      />
    </div>

    <!-- Body section -->
    <div style="text-align: left; color: #333;">
      <p>Hello ${customer_name? customer_name: ""},</p>
      <p>${body}</p>
      <p style="margin-top: 30px;">Thank you,</p>
      <p>${name}</p>
    </div>

    <!-- Footer section (always visible) -->
    <div
      style="
        background-color: #1a1d32;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        margin-top: 40px;
        border-radius: 0 0 8px 8px;
      "
    >
      <p style="margin: 0;">${name}</p>
      <p style="margin: 0;">${address}</p>
      <p style="margin: 0;">
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
        style="width: 100%; border-collapse: collapse; margin-top: 10px;"
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
    </div>
  </div>
</div>

        `,
      });
  
      return response; // Optionally return response for further handling
    } catch (err: any) {
      console.log(err.message);
    }
  };
  
