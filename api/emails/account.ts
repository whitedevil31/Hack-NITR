const sgMail = require('@sendgrid/mail')
import dotenv from "dotenv";
dotenv.config({ path: "./.env" })

sgMail.setApiKey(process.env.SENDGRID_API_KEY)




export const sendOrderConfirmationEmail = (email: string, name: string, id: any, fromAddress: string, toAddress: string, expectedDelivery: number) => {

  const output = `
    <p style="color: #000000">Hello ${name}, 
    <br>
    <br>
    <b><i>Your order has been successfully placed.</b></i> 
    <br>
    Your parcel from ${fromAddress} to ${toAddress} has an estimated of ${expectedDelivery} hours!
    <br>
    <br>
    <br>
    <b>
    Order ID: ${id}
    </b>
    <br>
    <br>
    You can track your order at http://localhost:3000/track
    Post.io at your service. 
    </p>
    <br>
    <br>
    <br>    
    <br>
    <br>
    <p style="color: #000000">
    You are receving this mail because you have opted for our service. Do reach out to us 
    if you think this is a mistake. 
    </p>
  `;

  sgMail.send({
    to: email,
    from: 'kums2kaushik@gmail.com',
    subject: 'Order Placed Successfully!',
    html: output
  })
}

export const sendInvoiceEmail = (username: string, email: string, id: any, fromAddress: string, toAddress: string, date: Date, weight: number, price: number, orderedOn: Date, paymentMode: string,) => {

  const invoice = `
  <!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <title> </title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      p {
        display: block;
        margin: 13px 0;
      }
    </style>

    <link
      href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Cabin:400,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Merriweather:400,700"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
      @import url(https://fonts.googleapis.com/css?family=Merriweather:400,700);
    </style>

    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
        .mj-column-per-60 {
          width: 60% !important;
          max-width: 60%;
        }
        .mj-column-per-40 {
          width: 40% !important;
          max-width: 40%;
        }
      }
    </style>

    <style type="text/css"></style>
    <style type="text/css">
      .hide_on_mobile {
        display: none !important;
      }
      @media only screen and (min-width: 480px) {
        .hide_on_mobile {
          display: block !important;
        }
      }
      .hide_section_on_mobile {
        display: none !important;
      }
      @media only screen and (min-width: 480px) {
        .hide_section_on_mobile {
          display: table !important;
        }

        div.hide_section_on_mobile {
          display: block !important;
        }
      }
      .hide_on_desktop {
        display: block !important;
      }
      @media only screen and (min-width: 480px) {
        .hide_on_desktop {
          display: none !important;
        }
      }
      .hide_section_on_desktop {
        display: table !important;
        width: 100%;
      }
      @media only screen and (min-width: 480px) {
        .hide_section_on_desktop {
          display: none !important;
        }
      }

      p,
      h1,
      h2,
      h3 {
        margin: 0px;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      @media only screen and (max-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-100 > .mj-column-per-75 {
          width: 75% !important;
          max-width: 75% !important;
        }
        .mj-column-per-100 > .mj-column-per-60 {
          width: 60% !important;
          max-width: 60% !important;
        }
        .mj-column-per-100 > .mj-column-per-50 {
          width: 50% !important;
          max-width: 50% !important;
        }
        .mj-column-per-100 > .mj-column-per-40 {
          width: 40% !important;
          max-width: 40% !important;
        }
        .mj-column-per-100 > .mj-column-per-33 {
          width: 33.333333% !important;
          max-width: 33.333333% !important;
        }
        .mj-column-per-100 > .mj-column-per-25 {
          width: 25% !important;
          max-width: 25% !important;
        }

        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-75 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-60 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-50 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-40 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-33 {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mj-column-per-25 {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="background-color: #ffffff">
    <div style="background-color: #ffffff">
      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 9px 0px 9px 0px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p
                              style="
                                font-family: Ubuntu, Helvetica, Arial;
                                text-align: center;
                              "
                            >
                              <span
                                style="
                                  font-size: 20px;
                                  font-family: Merriweather, Georgia, serif;
                                "
                                >INVOICE</span
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 9px 0px 9px 0px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-60 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <span style="font-size: 20px"
                                ><strong>${username}</strong></span
                              >
                            </p>
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <span style="font-size: 12px"
                                >From: ${fromAddress}</span
                              >
                            </p>
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <span style="font-size: 12px"
                                >To: ${toAddress}</span
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  class="mj-column-per-40 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <span style="font-size: 15px"
                                >Order ID : ${id}</span
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 9px 0px 9px 0px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 0px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <span style="font-size: 30px">FedEx</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 9px 0px 9px 0px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <strong
                                >Description&#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0;Weight&#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                Total Amount&#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                Payment Method:
                              </strong>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 9px 0px 9px 0px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <span style="font-size: 13px"
                                >From Chennai to Delhi&#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0;10kg&#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0;2000/-&#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
                                &#xA0;${paymentMode}</span
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 9px 0px 9px 0px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 15px 15px 15px 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 11px;
                              line-height: 1.5;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            <p style="font-family: Ubuntu, Helvetica, Arial">
                              <strong>Note</strong>
                            </p>
                            <ul style="list-style-type: circle">
                              <li>
                                <span style="font-size: 11px"
                                  > An Invoice Must accompany products
                                  returned for warranty</span
                                >
                              </li>
                              <li>
                                <span style="font-size: 11px"
                                  >Goods damaged During transit voids warranty.
                                </span>
                              </li>
                              <li>
                                <span style="font-size: 11px"
                                  > 90 days limited warranty unless otherwise
                                  stated.
                                </span>
                              </li>
                              <li>
                                <span style="font-size: 11px">
                                   30 days limited warranty on OEM processor (
                                  an internal parts of the product) exchange the
                                  same items only.
                                </span>
                              </li>
                              <li>
                                <span style="font-size: 11px"
                                  > All items carry MFG Warranty only No
                                  return or exchange.</span
                                >
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

  `




  sgMail.send({
    to: email,
    from: 'kums2kaushik@gmail.com',
    subject: 'Your Order Invoice is successfully generated',
    html: invoice
  })
}

