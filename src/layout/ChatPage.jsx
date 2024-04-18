import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AreaTop } from "../components";

const ChatPage = () => {
  const { id } = useParams(); // Get the contact ID from URL parameters
  const location = useLocation();
  const messageFromLink = location.state?.message; // Retrieve the message from the Link

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Use the message from the Link if available, otherwise fetch it
    const fetchMessage = async () => {
      setMessage(messageFromLink || `Message for Contact ID ${id}`);
    };

    fetchMessage();
  }, [id, messageFromLink]);

  return (
    <>
    <AreaTop/>
    <br />
    <div style={{ textAlign: "center" }}>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your response..." />
        <button>Submit</button>
      </div>
    </div></>
  );
};

export default ChatPage;
