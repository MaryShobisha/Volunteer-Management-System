import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Can you review the latest design mockups?",
    },
    {
      id: 2,
      name: "David Chen",
      lastMessage: "Thanks for your help with the project!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      lastMessage: "Let's discuss the timeline for the new feature",
    },
  ]);

  useEffect(() => {
    if (location.state?.messageSuccess) {
      setShowSuccess(true);

      const newMessage = {
        recipient: location.state.recipient,
        subject: location.state.subject || "(No subject)",
        content: location.state.message || "",
        timestamp: "Just now",
      };

      setSuccessMessage(newMessage);

      const newId = Math.max(...conversations.map((c) => c.id), 0) + 1;
      const newConversation = {
        id: newId,
        name: newMessage.recipient,
        lastMessage:
          newMessage.content.substring(0, 50) +
          (newMessage.content.length > 50 ? "..." : ""),
        subject: newMessage.subject,
        content: newMessage.content,
        timestamp: newMessage.timestamp,
      };

      if (!conversations.some((conv) => conv.name === newMessage.recipient)) {
        setConversations((prev) => [newConversation, ...prev]);
      }

      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location, conversations]);

  const handleMessageClick = (messageId) => {
    navigate(`/message/${messageId}`);
  };

  const handleNewMessageClick = () => {
    navigate("/new-message");
  };

  const handleViewMessage = () => {
    if (!successMessage) return;

    const conversation = conversations.find(
      (c) => c.name.toLowerCase() === successMessage.recipient.toLowerCase()
    );

    if (conversation) {
      navigate(`/message/${conversation.id}`, {
        state: {
          newMessage: {
            recipient: successMessage.recipient,
            subject: successMessage.subject,
            content: successMessage.content,
          },
        },
      });
    } else {
      const firstConversation = conversations[0];
      if (firstConversation) {
        handleMessageClick(firstConversation.id);
      }
    }
  };

  const buttonStyle = {
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Messages</h2>
        <button
          className="btn btn-primary"
          onClick={handleNewMessageClick}
          style={buttonStyle}
        >
          New Message
        </button>
      </div>

      {/* Success message alert */}
      {showSuccess && successMessage && (
        <div className="alert alert-light mb-4">
          <h4 className="alert-heading">Message Sent Successfully</h4>
          <p className="mb-0 text-secondary">
            Your message has been delivered to {successMessage.recipient}
          </p>
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleViewMessage}>
              View Message
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          className="form-control bg-light"
          placeholder="Search for messages...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h5 className="mb-4">Recent Conversation</h5>

      <div className="conversation-list">
        {conversations
          .filter(
            (message) =>
              searchQuery === "" ||
              message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              message.lastMessage
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map((message) => (
            <div
              key={message.id}
              className="mb-4"
              style={{ cursor: "pointer" }}
              onClick={() => handleMessageClick(message.id)}
            >
              <h6 className="fw-bold mb-2">{message.name}</h6>
              <p className="text-secondary">{message.lastMessage}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
