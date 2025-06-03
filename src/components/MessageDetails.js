// components/MessageDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showReply, setShowReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [messageData, setMessageData] = useState(null);

  const messagesData = [
    {
      id: 1,
      name: "Sarah Johnson",
      timestamp: "Just now",
      subject: "(No subject)",
      content:
        "Hi there! I wanted to follow up on our discussion about the new project timeline. Could we schedule a quick call tomorrow to go over the details? I have some ideas I'd like to share with the team. Best regards, Sarah",
    },
    {
      id: 2,
      name: "David Chen",
      timestamp: "2 hours ago",
      subject: "Project Assistance",
      content:
        "I really appreciate your help with the project. The solutions you suggested worked perfectly. Looking forward to collaborating again soon!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      timestamp: "Yesterday",
      subject: "Feature Timeline",
      content:
        "We should meet to discuss the timeline for implementing the new feature. I've prepared some documentation that outlines the key milestones and deliverables.",
    },
  ];

  useEffect(() => {
    const messageId = parseInt(id);

    const existingMessage = messagesData.find((msg) => msg.id === messageId);

    if (existingMessage) {
      setMessageData(existingMessage);
    } else {
      const newMessageState = location.state?.newMessage;
      if (newMessageState) {
        setMessageData({
          id: messageId,
          name: newMessageState.recipient,
          timestamp: "Just now",
          subject: newMessageState.subject || "(No subject)",
          content: newMessageState.content,
        });
      } else {
        setMessageData(null);
      }
    }
  }, [id, location]);

  const buttonStyle = {
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  };

  // Handle case where message is not found
  if (!messageData) {
    return (
      <div className="container py-4">
        <h2>Message not found</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/messages")}
          style={buttonStyle}
        >
          Back to Messages
        </button>
      </div>
    );
  }

  const handleReplyClick = () => {
    setShowReply(true);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      return;
    }

    setIsSending(true);

    // Mock API call to send the message
    setTimeout(() => {
      // await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     recipientId: messageData.id,
      //     recipientName: messageData.name,
      //     subject: `Re: ${messageData.subject}`,
      //     content: replyMessage
      //   })
      // });

      setIsSending(false);
      setSendSuccess(true);
      setReplyMessage("");

      setTimeout(() => {
        setSendSuccess(false);
        setShowReply(false);
      }, 3000);
    }, 1000);
  };

  const handleCancelReply = () => {
    setShowReply(false);
    setReplyMessage("");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Message Details</h2>

      <div className="bg-light p-4 rounded mb-4">
        <p className="text-secondary mb-1">{messageData.timestamp}</p>
        <p className="mb-1">
          <strong>From:</strong> {messageData.name}
        </p>
        <p className="text-secondary mb-0">
          <strong>Subject:</strong> {messageData.subject}
        </p>
      </div>

      <h4 className="mb-3">Message Content</h4>

      <div className="bg-light p-4 rounded mb-4">
        <p className="text-secondary">{messageData.content}</p>
      </div>

      {showReply && (
        <div className="mb-4">
          <h4 className="mb-3">Your Reply</h4>
          <div className="form-group">
            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              disabled={isSending}
            ></textarea>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleSendReply}
              disabled={isSending || !replyMessage.trim()}
              style={buttonStyle}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancelReply}
              disabled={isSending}
              style={buttonStyle}
            >
              Cancel
            </button>
          </div>
          {sendSuccess && (
            <div className="alert alert-success mt-3">
              Message sent successfully!
            </div>
          )}
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        {!showReply && (
          <button
            className="btn btn-primary"
            onClick={handleReplyClick}
            style={buttonStyle}
          >
            Reply
          </button>
        )}
        <button className="btn btn-outline-primary" style={buttonStyle}>
          Forward
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/messages")}
          style={buttonStyle}
        >
          Back to Messages
        </button>
      </div>
    </div>
  );
};

export default MessageDetails;
