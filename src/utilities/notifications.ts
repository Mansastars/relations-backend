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

export const SendEmailVerification = async (to: string, token: string) => {
  try {
    const response = await transport.sendMail({
      from: `${process.env.GMAIL_USER}`,
      to,
      subject: "PLEASE VERIFY YOUR ACCOUNT",
      html: `<div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 25px; border: 2px solid #00CED1; border-radius: 5px;">
      <img src="https://assets-global.website-files.com/656a05e80b02929dac61def9/656c9f5f7a03960364b37e73_Screenshot_2023-02-12_at_22.15.46-removebg-preview%20(1)-p-500.png" alt="Mansastars" style="height: 100px; width: 100px; margin-bottom: 20px;">
      <h1 style="margin-bottom: 20px;">Welcome to Mansastars</h1>
      <p style="margin-bottom: 20px;">Click the button below to verify your account</p>
      <a href="https://${process.env.DOMAIN}/verify/${token}" style="display: inline-block; padding: 10px 20px; border-radius: 10px; background-color: #00CED1; color: #fff; text-decoration: none;">Verify Account</a>
  </div>`,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const ResetPaaswordMail = async (to: string, token: string) => {
  try {
    const response = await transport.sendMail({
      from: `${process.env.GMAIL_USER}`,
      to,
      subject: "PLEASE VERIFY YOUR ACCOUNT",
      html: `
        <div width="50%" style="text-align: center; padding: 25px; border-radius: 5px; border: 2px solid #00CED1;">
        <img src="https://assets-global.website-files.com/656a05e80b02929dac61def9/656c9f5f7a03960364b37e73_Screenshot_2023-02-12_at_22.15.46-removebg-preview%20(1)-p-500.png" alt="Mansastars" height="100px" width="100px">
        <h1>Welcome to Mansastars</h1>
        <p style="margin-bottom: 10px">Click the button below to reset your password</p>
        <br />
        <a href="https://${process.env.DOMAIN}/reset-password/${token}" type="button" style="text-align: center; padding: 10px; border-radius: 10px; background: #00CED1; text-decoration: none; color: white;">Reset Password</a>
        <br />
        </div>
        `,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const SendInvestorsUpdate =
  async (to: string,
    subject: string,
    company_description: string,
    founders_profile: string,
    chartImageUrl: string,
    gross_margin: string,
    wins: string,
    lows: string,
    news: string,
    requests: string,
    deck_line: string,
    founders_message: string,
    company_name: string,
    targets: string,
    logoUrl: string,
    cash_in_hand: string,
    cash_burn: string
  ) => {
    try {
      const response = await transport.sendMail({
        from: `${process.env.GMAIL_USER}`,
        to,
        subject,
        html: `
      Kindly find below the Investor Update report of ${company_name}.

      <body style="margin: 0; padding: 0; background-color: #8080801a; font-size: 1rem; font-family: Inter">
        <!-- Email template Begins -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 100px 20px 120px 20px">
              <!-- Logo Container -->
              <div style="display: flex; justify-content: center; align-items: center; padding-bottom: 30px;">
                <img src=${logoUrl} alt="Respondent's Logo" style="max-width: 20%; display: block; margin: 0 auto;" />
              </div>
              <!-- Email Content -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 37px 44px; background-color: #fff; margin-top: 15px; ">
                    <!-- Company's Description Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Company Description
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${company_description}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Company's Description Container Ends -->
                    <!-- Founder(s) Profile(s) Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Founder(s) Profile(s)
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${founders_profile}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Founder(s) Profile(s) Container Ends -->
                    <!-- Chart Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Net Monthly Recurring Revenue (YTD) in USD
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                          <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              MRR YTD<br />
                              <img class="chart image" src=${chartImageUrl} alt="Chart" style="width: 100%; height: auto" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Chart Container Ends -->
                    <!-- Gross Margin Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style=" font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Gross Margin
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${gross_margin}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Gross Margin Container Ends -->
                    <!-- Forecasting Next Months Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Forecasting Next Months
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${targets}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Forecasting Next Months Container Ends -->
                    <!-- Cash Burn Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Cash Burn
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${cash_burn}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- End of cash burn Container -->
                    <!-- Cash in hand Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Cash In Hand
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${cash_in_hand}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- End of cash in hand Container -->
                    <!-- Wins Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Wins
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${wins}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Wins Container Ends -->
                    <!-- Lows Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Lows
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${lows}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!-- Lows Container Ends -->
                    <!-- News Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            News
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${news}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!--News Container Ends -->
                    <!--Requests Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Requests
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${requests}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!--Requests Container Ends -->
                    <!--Deck Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Deck
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${deck_line}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!--Deck Container Ends -->
                    <!--Founder's Message Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #4a4b4d5c; padding-top: 20px;">
                          <div style="font-size: 26px; font-style: normal; font-weight: 700; line-height: 26px; padding-bottom: 30px;">
                            Founder's Message
                          </div>
                          <!-- Font size for default screens -->
                          <div style="font-size: 17px; font-style: normal; font-weight: 400; line-height: 26.2px;">
                            <!-- Font size for screens with a width of 600px or less -->
                            <div style="@media only screen and (max-width: 600px) {font-size: 14px;}">
                              ${founders_message}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!--Founder's Message Container Ends -->
                    <!-- Mansa Stars Container -->
                    <div style="text-align: center; padding-top: 20px; padding-bottom: 20px; padding-right: 10px; padding-left: 10px; background-color: #fff; font-size: 14px;">
                      <div>
                        <p>
                          MansaStars is a platform that allows founders to
                          seamlessly report to investors and stakeholders. Venture
                          and angel investors can track their portfolio performance
                          and founders can regularly send updates and share key
                          performance metrics. Visit 
                          <a href="https://relations.mansastars.com/" style="color: #01b7b7" target="_blank">here</a>.</p></div>
                        <p>
                          <a href="https://relations.mansastars.com/" style="color: #01b7b7" target="_blank" rel="noopener noreferrer">www.mansastars.com</a>
                        </p>
                        <img src="https://assets-global.website-files.com/656a05e80b02929dac61def9/656c9f5f7a03960364b37e73_Screenshot_2023-02-12_at_22.15.46-removebg-preview%20(1)-p-500.png" alt="" style="width: 100px; height: 60px" />
                      </div>
                      <!-- End of Mansa Stars Container -->
                    </div>
                  </td>
                </tr>
              </table>
              <!-- Email Content Ends -->
            </td>
          </tr>
        </table>
        <!-- Email template Ends -->
      </body>
      `
      })
    } catch (err: any) {
      console.log(err.message)
    }
  }
