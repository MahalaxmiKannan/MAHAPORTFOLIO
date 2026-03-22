import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { certifications } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 50px 0px;
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
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 330px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854ce6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 0px 20px rgba(133, 76, 230, 0.5);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  object-fit: cover;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;

const CourseName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Issuer = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  margin-top: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + 99};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 14px;
`;

const ModalContent = styled.div`
  width: min(860px, 92vw);
  max-height: 86vh;
  overflow: auto;
  background: ${({ theme }) => theme.card};
  border: 1px solid #854ce6;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const ModalTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 58vh;
  object-fit: contain;
  border-radius: 10px;
  background: ${({ theme }) => theme.white};
`;

const PdfViewer = styled.iframe`
  width: 100%;
  height: 58vh;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.white};
`;

const NoPreview = styled.div`
  width: 100%;
  min-height: 220px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text_secondary};
`;

const PreviewNotice = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + 99};
  }
`;

const DownloadButton = styled.a`
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + 99};
  }
  &[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.6;
  }
`;

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [previewError, setPreviewError] = useState("");

  useEffect(() => {
    if (!selectedCert) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCert]);

  const isPdfFile = (value = "") => {
    if (typeof value !== "string") return false;
    return value.toLowerCase().split("?")[0].endsWith(".pdf");
  };

  const getCertificateSource = (cert) => {
    if (!cert) return "";
    const candidate = cert.file || cert.image || "";
    if (typeof candidate !== "string") return "";
    if (candidate.trim().toLowerCase() === "add link") return "";
    return candidate;
  };

  const getSafeFileName = (title, source) => {
    const extension = isPdfFile(source) ? "pdf" : "jpg";
    return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${extension}`;
  };

  useEffect(() => {
    let isMounted = true;

    const resolvePreviewSource = async () => {
      if (!selectedCert) {
        if (isMounted) {
          setPreviewSource("");
          setPreviewError("");
        }
        return;
      }

      const source = getCertificateSource(selectedCert);
      if (!source) {
        if (isMounted) {
          setPreviewSource("");
          setPreviewError("Certificate file is not available yet.");
        }
        return;
      }

      if (!isPdfFile(source)) {
        if (isMounted) {
          setPreviewSource(source);
          setPreviewError("");
        }
        return;
      }

      try {
        const response = await fetch(source, { method: "HEAD" });
        const contentType = response.headers.get("content-type") || "";
        const isValidPdf = response.ok && contentType.toLowerCase().includes("pdf");

        if (!isMounted) return;

        if (isValidPdf) {
          setPreviewSource(source);
          setPreviewError("");
        } else {
          setPreviewSource(selectedCert.image || "");
          setPreviewError("PDF file not found in public/certificates. Showing thumbnail.");
        }
      } catch (error) {
        if (!isMounted) return;
        setPreviewSource(selectedCert.image || "");
        setPreviewError("Unable to load certificate PDF. Showing thumbnail.");
      }
    };

    resolvePreviewSource();

    return () => {
      isMounted = false;
    };
  }, [selectedCert]);

  const selectedIsPdf = isPdfFile(previewSource);

  return (
    <Container id="certifications">
      <Wrapper>
        <Title>Certifications</Title>
        <Desc>My continuous learning journey and technical certifications.</Desc>
        <CardContainer>
          {certifications.map((cert, index) => (
            <Card
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image src={cert.image} alt={cert.title} />
              <Details>
                <CourseName>{cert.title}</CourseName>
                <Issuer>{cert.issuer}</Issuer>
                <Date>{cert.date}</Date>
              </Details>
              <Button type="button" onClick={() => setSelectedCert(cert)}>
                View Certificate
              </Button>
            </Card>
          ))}
        </CardContainer>
      </Wrapper>

      {selectedCert && (
        <ModalOverlay onClick={() => setSelectedCert(null)}>
          <ModalContent onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedCert.title}</ModalTitle>
              <ActionButton type="button" onClick={() => setSelectedCert(null)}>
                Close
              </ActionButton>
            </ModalHeader>

            {previewSource ? (
              selectedIsPdf ? (
                <PdfViewer
                  title={`${selectedCert.title} PDF preview`}
                  src={`${previewSource}#toolbar=0&navpanes=0&view=FitH`}
                />
              ) : (
                <ModalImage src={previewSource} alt={selectedCert.title} />
              )
            ) : (
              <NoPreview>
                Certificate file is not available yet. Add a valid image or PDF path in data.
              </NoPreview>
            )}

            {previewError && <PreviewNotice>{previewError}</PreviewNotice>}

            <ActionRow>
              <DownloadButton
                href={previewSource || "#"}
                download={getSafeFileName(selectedCert.title, previewSource)}
                aria-disabled={!previewSource}
              >
                Download Certificate
              </DownloadButton>
            </ActionRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Certifications;