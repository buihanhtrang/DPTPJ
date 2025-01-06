import React, { useState } from 'react';
import { getGeminiResponse } from './geminiService'; // Service for API
import styles from './component.module.css';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Modal toggle state
  const [input, setInput] = useState(''); // Current input message
  const [messages, setMessages] = useState([{ sender: 'AI', content: "Hello there! How can I help you today?" }]); // Chat history
  const [isRecording, setIsRecording] = useState(false);

  // Initialize Speech Recognition API
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;
  
  if (!recognition) {
    console.warn("Speech Recognition API is not supported in this browser.");
  }
  // Initialize Speech Synthesis API
  const synth = window.speechSynthesis;

  // Handle Text-to-Speech (TTS)
  const handleTextToSpeech = (text) => {
    if (!synth) {
      console.warn("Speech Synthesis not supported in this browser.");
      alert("Speech Synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set language
    synth.speak(utterance);
  };

  // Start Recording for Speech-to-Text (STT)
  const startRecording = () => {
    if (!recognition) {
      console.warn("Speech Recognition not supported in this browser.");
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    setIsRecording(true);
    recognition.lang = "en-US"; // Set language
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setIsRecording(false);
    };
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  // Function to parse and render Markdown-like content
  const renderFormattedMessage = (message) => {
    const formattedMessage = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italics
      .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
      .replace(/\n/g, '<br>'); // New lines

    return { __html: formattedMessage };
  };

  // Send message and get response
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return; // Prevent sending empty messages

    // Add user's message to the chat history
    const userMessage = { sender: 'User', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); // Update state

    // Clear input field
    setInput('');

    // Send request to Gemini API
    const aiResponse = await getGeminiResponse(updatedMessages); // Send full chat history
    if (aiResponse) {
      // Add AI's response to chat history
      const aiMessage = { sender: 'AI', content: aiResponse };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // Trigger Text-to-Speech for bot response
      handleTextToSpeech(aiResponse);
    }
  };

  return (
    <>
      {/* Floating button to toggle the modal */}
      <button className={styles.chatButton} onClick={toggleModal}>
        💬
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className={styles.chatModal}>
          <div className={styles.modalHeader}>
            <h3>AI Assistant</h3>
            <button className={styles.closeButton} onClick={toggleModal}>
              ✖
            </button>
          </div>

          {/* Chat messages */}
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === 'User'
                    ? styles.userMessageBubble
                    : styles.aiMessageBubble
                }
              >
                <p
                  dangerouslySetInnerHTML={renderFormattedMessage(
                    msg.content
                  )}
                />
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className={styles.chatForm}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="Type your message..."
              className={styles.chatInput}
            />
            <button
              onClick={startRecording}
              disabled={isRecording}
              className="record-button"
            >
              {isRecording ? "Recording..." : "🎙️ Record"}
            </button>
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatModal;
