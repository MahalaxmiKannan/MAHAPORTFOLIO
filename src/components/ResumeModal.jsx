import React, { useState } from "react";
import styled from "styled-components";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background-color: ${({ theme }) => theme.primary || "#7B2CBF"};
  color: white;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const PdfContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;

  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .react-pdf__Page {
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #666;
  min-width: 100px;
  text-align: center;
`;

const ControlButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary || "#7B2CBF"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primary || "#7B2CBF"}dd;
    filter: brightness(0.9);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled(ControlButton)`
  background-color: #4caf50;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }
`;

const ResumeModal = ({ isOpen, onClose, resumePath }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  if (!isOpen) return null;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Resume</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <PdfContainer>
          <Document file={resumePath} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={800} />
          </Document>
        </PdfContainer>

        <Controls>
          <ControlButton onClick={prevPage} disabled={pageNumber <= 1}>
            ← Previous
          </ControlButton>
          <PageInfo>
            {numPages ? `Page ${pageNumber} of ${numPages}` : "Loading..."}
          </PageInfo>
          <ControlButton onClick={nextPage} disabled={pageNumber >= numPages}>
            Next →
          </ControlButton>
          <DownloadButton onClick={downloadResume}>
            ⬇ Download
          </DownloadButton>
        </Controls>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResumeModal;
