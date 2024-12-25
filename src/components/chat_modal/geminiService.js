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

  // Instruction to fine-tune Gemini's behavior
  const systemMessage = {
    role: "user",
    parts: [
      {
        text: "You are an AI sales assistant specializing in electronic products. Respond professionally and helpfully, with a friendly tone, as if you were assisting a customer in a retail store. Provide clear and concise answers, and recommend products where appropriate.",
      },
    ],
  };

  // Add the instruction as the first message
  formattedContents.unshift(systemMessage);

  console.log(formattedContents);
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
