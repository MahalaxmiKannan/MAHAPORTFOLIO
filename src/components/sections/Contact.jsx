import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const Contact = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!serviceId || !templateId || !publicKey) {
      setStatusMessage(
        "Direct send is not configured. Add EmailJS IDs in .env and restart the app."
      );
      return;
    }

    setSending(true);
    setStatusMessage("");

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatusMessage("Message sent successfully.");
      formRef.current.reset();
    } catch (error) {
      const reason = error?.text || error?.message || "Unknown EmailJS error";
      if (String(reason).toLowerCase().includes("service id")) {
        setStatusMessage("Direct send failed: invalid EmailJS Service ID. Update REACT_APP_EMAILJS_SERVICE_ID in .env.");
      } else if (String(reason).toLowerCase().includes("template id")) {
        setStatusMessage("Direct send failed: invalid EmailJS Template ID. Update REACT_APP_EMAILJS_TEMPLATE_ID in .env.");
      } else if (String(reason).toLowerCase().includes("public key") || String(reason).toLowerCase().includes("user id")) {
        setStatusMessage("Direct send failed: invalid EmailJS Public Key. Update REACT_APP_EMAILJS_PUBLIC_KEY in .env.");
      } else {
        setStatusMessage(`Direct send failed: ${reason}`);
      }
      console.error("EmailJS send failed:", error);
    } finally {
      setSending(false);
    }
  };
  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={formRef} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <input type="hidden" name="to_email" value="mahalaxmikannan51@gmail.com" />
          <ContactInput placeholder="Your Email" name="from_email" type="email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" name="message" rows={4} required />
          <ContactButton type="submit" value={sending ? "Sending..." : "Send"} disabled={sending} />
          {statusMessage && (
            <p style={{ margin: 0, fontSize: "14px", color: "#d6e4ff" }}>{statusMessage}</p>
          )}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
