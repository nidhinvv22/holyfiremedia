/**
 * Generate the HTML email template for purchase confirmation.
 */
export function getPurchaseConfirmationEmail(data: {
  songTitle: string;
  artistName: string;
  paymentId: string;
  downloadUrl: string;
  customerName?: string;
}) {
  const greeting = data.customerName ? `Hi ${data.customerName}` : 'Hi there';

  return {
    subject: `🎵 Your Karaoke Track is Ready — ${data.songTitle}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f0524; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
    <!-- Header -->
    <tr>
      <td style="padding: 40px 30px 20px; text-align: center; background: linear-gradient(135deg, #ec4899, #8b5cf6); border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
          🔥 HolyfireMedia
        </h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
          Premium Karaoke Tracks
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 30px; background-color: #1a0b3e; border-left: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0 0 16px; color: #e2d5f5; font-size: 16px; line-height: 1.6;">
          ${greeting},
        </p>
        <p style="margin: 0 0 24px; color: #e2d5f5; font-size: 16px; line-height: 1.6;">
          Thank you for your purchase! Your premium karaoke track is ready to download.
        </p>

        <!-- Song Details Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 4px; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Song
              </p>
              <p style="margin: 0 0 12px; color: #ffffff; font-size: 18px; font-weight: 700;">
                ${data.songTitle}
              </p>
              <p style="margin: 0 0 4px; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Artist
              </p>
              <p style="margin: 0 0 12px; color: #e2d5f5; font-size: 14px;">
                ${data.artistName}
              </p>
              <p style="margin: 0 0 4px; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Payment ID
              </p>
              <p style="margin: 0; color: #e2d5f5; font-size: 13px; font-family: monospace;">
                ${data.paymentId}
              </p>
            </td>
          </tr>
        </table>

        <!-- Download Button -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding: 8px 0 24px;">
              <a href="${data.downloadUrl}" 
                 style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; letter-spacing: 0.5px;">
                ⬇️ Download Premium Track
              </a>
            </td>
          </tr>
        </table>

        <!-- Warning -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 8px;">
          <tr>
            <td style="padding: 14px 16px;">
              <p style="margin: 0; color: #fbbf24; font-size: 13px; line-height: 1.5;">
                ⏰ This download link expires in <strong>24 hours</strong>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 24px 30px; background-color: #130828; border-radius: 0 0 16px 16px; border-left: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <p style="margin: 0 0 8px; color: #8b7aab; font-size: 13px; text-align: center;">
          HolyfireMedia — Malayalam Christian Karaoke Tracks
        </p>
        <p style="margin: 0; color: #6b5e82; font-size: 12px; text-align: center;">
          Questions? Reply to this email or contact 
          <a href="mailto:jmmusicdistribution@gmail.com" style="color: #a78bfa; text-decoration: none;">jmmusicdistribution@gmail.com</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}
