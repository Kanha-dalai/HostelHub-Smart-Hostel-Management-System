require("dotenv").config();

const transporter = require("./config/emailTransporter");

const sendTestEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: `"HostelHub" <${process.env.EMAIL_USER}>`,

            // Put another email address here to receive the test email
            to: "chinmayamajhi65@gmail.com",

            subject: "HostelHub Email Test",

            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Welcome to HostelHub 🏠</h2>

                    <p>This is a test email from your HostelHub project.</p>

                    <p>If you received this email, your email configuration is working successfully! 🎉</p>
                </div>
            `
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("Email sending failed:");
        console.error(error.message);
    }
};

sendTestEmail();