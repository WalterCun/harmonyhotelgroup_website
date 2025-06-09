export const contactTemplate = ({ email, message }: { email: string, message: string }) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Contact Form Confirmation</title>
<style>
    /* General Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* Client-specific Styles */
    .ReadMsgBody { width: 100%; }
    .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

    /* Responsive Styles */
    @media screen and (max-width: 600px) {
        .email-container {
            width: 100% !important;
            margin: auto !important;
        }
        .fluid {
            max-width: 100% !important;
            height: auto !important;
            margin-left: auto !important;
            margin-right: auto !important;
        }
        .stack-column, .stack-column-center {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            direction: ltr !important;
        }
        .stack-column-center {
            text-align: center !important;
        }
        .center-on-narrow {
            text-align: center !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
            float: none !important;
        }
        table.center-on-narrow {
            display: inline-block !important;
        }
    }

</style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f0f3f5;">
    <center style="width: 100%; background-color: #f0f3f5;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width: 600px;" class="email-container">
            <!-- START PREHEADER -->
            <tr>
                <td style="padding: 10px; text-align: center; font-family: sans-serif; font-size: 12px; line-height: 1.2; color: #888888; display: none !important; mso-hide: all;">
                    We've received your message and will be in touch shortly.
                </td>
            </tr>
            <!-- END PREHEADER -->

            <!-- START HEADER -->
            <tr>
                <td style="padding: 20px 0; text-align: center; background-color: #ffffff;">
                    <img src="https://placehold.co/200x50/1a2a3a/ffffff?text=Your+Hotel+Logo" width="200" height="50" alt="Hotel Logo" border="0" style="font-family: sans-serif; font-size: 15px; line-height: 1.2; color: #555555;">
                </td>
            </tr>
            <!-- END HEADER -->

            <!-- START MAIN CONTENT -->
            <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- Title -->
                        <tr>
                            <td style="font-family: 'Georgia', serif; font-size: 24px; line-height: 1.3; color: #222222; font-weight: bold; text-align: center; padding-bottom: 20px;">
                                Thank You For Reaching Out!
                            </td>
                        </tr>
                        <!-- Body Text -->
                        <tr>
                            <td style="font-family: 'Arial', sans-serif; font-size: 16px; line-height: 1.6; color: #555555; text-align: left; padding-bottom: 20px;">
                                Hola Administrador,
                                <br><br>
                                Tienes un nuevo mensaje de un usuario a través del formulario de contacto de tu sitio web. A continuación, se muestra un resumen de la consulta:
                            </td>
                        </tr>
                        <!-- Summary of Inquiry -->
                        <tr>
                            <td style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" width="100%" style="border-left: 3px solid #e0c56e;">
                                    <tr>
                                        <td style="background-color: #f8f8f8; padding: 20px;">
                                            <table cellspacing="0" cellpadding="0" width="100%">
                                                <tr>
                                                    <td style="font-family: 'Arial', sans-serif; font-size: 14px; line-height: 1.5; color: #333333;">
                                                        <div style="color: #1a2a3a;">Mensaje de: <a herf="mailto:${email}">${email}<a/></div>
                                                        <p style="margin-top: 10px; margin-bottom: 0; font-style: italic; color: #666666;">${message}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- Button -->
                        <tr>
                            <td style="padding: 30px 0 20px 0; text-align: center;">
                                <!--[if (gte mso 9)|(IE)]>
                                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://yourwebsite.com" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="10%" strokecolor="#e0c56e" fillcolor="#1a2a3a">
                                    <w:anchorlock/>
                                    <center style="color:#ffffff;font-family:sans-serif;font-size:14px;font-weight:bold;">Visit Our Website</center>
                                </v:roundrect>
                                <![endif]-->
                                <a href="http://yourwebsite.com" style="background-color:#1a2a3a;border:1px solid #e0c56e;border-radius:5px;color:#ffffff;display:inline-block;font-family:'Arial',sans-serif;font-size:14px;font-weight:bold;line-height:45px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;mso-hide:all;">Visit Our Website</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- END MAIN CONTENT -->

            <!-- START FOOTER -->
            <tr>
                <td style="padding: 30px; text-align: center; background-color: #1a2a3a;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td style="font-family: 'Arial', sans-serif; font-size: 14px; line-height: 1.5; color: #dddddd; text-align: center;">
                                <strong style="color: #ffffff;">[Your Hotel Name]</strong><br>
                                [123 Park Avenue, City, State 12345]<br>
                                Phone: [123-456-7890] | Email: [info@yourhotel.com]
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 0 0 0; text-align: center;">
                                <!-- Social Icons -->
                                <a href="#" style="text-decoration: none; padding: 0 5px;">
                                    <img src="https://placehold.co/32x32/ffffff/1a2a3a?text=f" width="32" height="32" alt="Facebook" border="0" style="border-radius: 50%;">
                                </a>
                                <a href="#" style="text-decoration: none; padding: 0 5px;">
                                    <img src="https://placehold.co/32x32/ffffff/1a2a3a?text=in" width="32" height="32" alt="Instagram" border="0" style="border-radius: 50%;">
                                </a>
                                <a href="#" style="text-decoration: none; padding: 0 5px;">
                                     <img src="https://placehold.co/32x32/ffffff/1a2a3a?text=X" width="32" height="32" alt="Twitter" border="0" style="border-radius: 50%;">
                                </a>
                            </td>
                        </tr>
                         <tr>
                            <td style="font-family: 'Arial', sans-serif; font-size: 12px; line-height: 1.5; color: #888888; text-align: center; padding-top: 20px;">
                                You are receiving this email because you contacted us through our website form.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- END FOOTER -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
    </center>
</body>
</html>
`
}