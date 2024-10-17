import {
  MessageList,
  MessageInput,
  ChatContainer,
  MainContainer,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { Fetchgpt } from "./Fetchgpt";

interface MessageType {
  text: string;
  sender: 'user' | 'bot';
}

const ChatUI = () => {
  const [userQuestions, setUserQuestions] = useState<MessageType[]>([]); 
  const [isTyping, setIsTyping] = useState(false);

  const question = async (text: string) => {
    const userQuestion = { text, sender: 'user' as const };
    setUserQuestions((prevQuestions) => [...prevQuestions, userQuestion]);

    const gptMessages = [
      ...userQuestions.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user' ? 'user' : 'assistant', content: text },
    ];

    setIsTyping(true);

    const gpttResponse = await Fetchgpt(gptMessages);
    const gptMessage = { text: gpttResponse, sender: 'bot' as const };

    setIsTyping(false);

    setUserQuestions((prevMessages) => [...prevMessages, gptMessage]);
  };

  return (
    <MainContainer style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ChatContainer style={{ flex: 1, overflowY: "auto" }}>
        <MessageList typingIndicator={isTyping ? <TypingIndicator content="Bot is typing..." /> : null}>
          {userQuestions.map((msg: MessageType, index: number) => (
            <Message
            key={index}
            model={{
              message: msg.text,
              sender: msg.sender === 'user' ? 'You' : 'assistant',
              direction: msg.sender === 'user' ? 'outgoing' : 'incoming',
              position: 'single',
              sentTime: "just now",
            }}
            style={{
              backgroundColor: msg.sender === 'user' ? '#b3e5fc' : '#e0f7fa',
              padding: '10px 15px',
              borderRadius: '15px',
              margin: '10px 0',
              maxWidth: '60%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              color: '#000',
            }}
          />
          ))}
        </MessageList>
      </ChatContainer>
      <div style={{ padding: "10px", backgroundColor: "#f1f1f1" }}>
        <MessageInput
                  onSend={question}
        />
      </div>
    </MainContainer>
  );
};

export default ChatUI;