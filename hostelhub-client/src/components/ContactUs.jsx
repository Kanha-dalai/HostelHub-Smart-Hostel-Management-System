import "./ContactUs.css";
import hostelBg from "../assets/hostel-bg.jpg";

function ContactUs() {
  return (
    <div
      className="contact-page"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.75),
          rgba(0,0,0,0.75)
        ), url(${hostelBg})`,
      }}
    >
      {/* ================= HEADER ================= */}

      <section className="contact-header">

        <span className="contact-badge">
          CONTACT HOSTELHUB
        </span>

        <h1>Get In Touch</h1>

        <p>
          We'd love to hear from you. If you have any questions,
          suggestions or need support, feel free to contact us.
        </p>

      </section>

      {/* ================= CONTACT CONTAINER ================= */}

      <section className="contact-container">

        {/* Left Side */}

        <div className="contact-info">

          <h2>Contact Information</h2>

          <p>
            Our team is always ready to help you with any
            hostel-related queries or technical support.
          </p>

          <div className="info-box">

            <h3>📍 Address</h3>

            <p>
              GIET University,
              Gunupur,
              Rayagada,
              Odisha - 765022
            </p>

          </div>

          <div className="info-box">

            <h3>📞 Phone</h3>

            <p>+91 9876543210</p>

          </div>

          <div className="info-box">

            <h3>📧 Email</h3>

            <p>support@hostelhub.com</p>

          </div>

          <div className="info-box">

            <h3>🕒 Working Hours</h3>

            <p>
              Monday - Saturday
              <br />
              9:00 AM - 6:00 PM
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="contact-form">

          <h2>Send a Message</h2>

          <form>

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
            />

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Subject</label>

            <input
              type="text"
              placeholder="Enter subject"
            />

            <label>Message</label>

            <textarea
              rows="6"
              placeholder="Write your message..."
            ></textarea>

            <button
              type="submit"
              className="send-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <section className="contact-footer">

        <h2>Thank You for Visiting HostelHub</h2>

        <p>
          Together we are building a smarter, safer and
          more efficient hostel management experience.
        </p>

      </section>

    </div>
  );
}

export default ContactUs;