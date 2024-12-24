import axios from "axios";

export const getGeminiResponse = async (messages) => {

  const formattedContents = messages.map((msg) => ({
    role: msg.sender === 'User' ? 'user' : 'model',
    parts: [
      {
        text: msg.content,
      },
    ],
  }));

  try {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC-axEyDlzKC-5Q-EiIzf5G0NroPCRMv4Y",
      method: "post",
      data: {
        contents: formattedContents,
      },
    });
    console.log("API response text: "+response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    return response["data"]["candidates"][0]["content"]["parts"][0]["text"];
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};
