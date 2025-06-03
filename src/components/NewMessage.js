import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NewMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we have recipient data from project details
  const recipientFromProject = location.state?.recipient || "";
  const recipientEmailFromProject = location.state?.recipientEmail || "";
  const recipientImageFromProject = location.state?.recipientImage || "";
  const projectTitle = location.state?.projectTitle || "";

  // Set default subject if coming from a project
  const defaultSubject = projectTitle
    ? `Regarding ${projectTitle} Project`
    : "";

  const [recipient, setRecipient] = useState(recipientFromProject);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showRecipientDetails, setShowRecipientDetails] = useState(
    !!recipientFromProject
  );

  const fileInputRef = React.useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();

    console.log("Sending message:", {
      recipient,
      subject,
      message,
      attachedFiles,
    });

    navigate("/messages", {
      state: {
        messageSuccess: true,
        recipient: recipient,
        subject: subject,
        message: message,
        attachedFiles: attachedFiles.map((file) => file.name),
      },
    });
  };

  const handleFileAttach = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">New Message</h2>

      <form onSubmit={handleSendMessage}>
        <div className="mb-4">
          <h5>Recipients</h5>

          {showRecipientDetails && recipientFromProject && (
            <div className="selected-recipient mb-3 p-3 border rounded bg-light">
              <div className="d-flex align-items-center">
                {recipientImageFromProject && (
                  <img
                    src={recipientImageFromProject}
                    alt={recipientFromProject}
                    className="rounded-circle me-3"
                    width="40"
                    height="40"
                  />
                )}
                <div>
                  <div className="fw-bold">{recipientFromProject}</div>
                  {recipientEmailFromProject && (
                    <div className="text-muted small">
                      {recipientEmailFromProject}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="recipient" className="form-label">
              To
            </label>
            <input
              type="text"
              className="form-control bg-light"
              id="recipient"
              placeholder="Search for people"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                // If user changes the pre-filled recipient, hide the detailed recipient card
                if (
                  recipientFromProject &&
                  e.target.value !== recipientFromProject
                ) {
                  setShowRecipientDetails(false);
                }
              }}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <h5>Message</h5>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control bg-light"
              id="subject"
              placeholder="Add a subject....."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <textarea
              className="form-control bg-light"
              id="messageContent"
              rows="6"
              placeholder="Type your message here...."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Display attached files */}
          {attachedFiles.length > 0 && (
            <div className="mb-3">
              <h6>Attached Files:</h6>
              <ul className="list-group">
                {attachedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {file.name}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleFileAttach}
          >
            Attach Files
          </button>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
