import { useEffect, useMemo, useState } from "react";
// @ts-ignore
import PubNub from "pubnub";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import useInput from "../hooks/useInput";
import { Button, TextField } from "@material-ui/core";
import {
  ChatContainer,
  InputContainer,
  Log,
  StyledSendIcon,
  StyledTextField,
} from "./Styles";

type Message = { uuid: string; text: string };

const LiveChat = () => {
  const [channel] = useState("Screening Room");
  const [messages, setMessages] = useState<Message[]>([]);
  const username = useMemo(
    () =>
      uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: " ",
      })
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" "),
    []
  );
  const chatMessage = useInput();
  const pubnub = useMemo(() => {
    return new PubNub({
      publishKey: "pub-c-5ab0e177-a72b-4a58-861c-0fc226fc4243",
      subscribeKey: "sub-c-b195c3ec-7262-11eb-9641-66d8dbfc759a",
      uuid: username,
    });
  }, [username]);

  // Set up PubNub
  useEffect(() => {
    console.log("Setting up PubNub");

    // Add listeners
    pubnub.addListener({
      status: (statusEvent: any) => {
        if (statusEvent.category === "PNConnectedCategory") {
          console.log("Connected to PubNub!");
        }
      },
      message: (msg: any) => {
        if (msg.message.text) {
          const newMessages: Message[] = [];
          newMessages.push({
            uuid: msg.message.uuid,
            text: msg.message.text,
          });
          setMessages((messages: Message[]) => messages.concat(newMessages));
        }
      },
    });

    // Subscribe to channel
    pubnub.subscribe({ channels: [channel] });

    // Fetch history
    pubnub.history(
      {
        channel: channel,
        count: 5, // default 100
        stringifiedTimeToken: true, // default false
      },
      (status: any, response: any) => {
        const newMessages: Message[] = [];
        for (let i = 0; i < response.messages.length; i++) {
          newMessages.push({
            uuid: response.messages[i].entry.uuid,
            text: response.messages[i].entry.text,
          });
        }
        setMessages((messages: Message[]) => messages.concat(newMessages));
      }
    );

    // dispose
    return () => {
      console.log("Shutting down pubnub");
      pubnub.unsubscribeAll();
      setMessages([]);
    };
  }, [pubnub, channel, username]);

  // Handle inputs
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      publishMessage();
    }
  };

  // Sending messages via PubNub
  const publishMessage = () => {
    if (chatMessage.value) {
      const messageObject = {
        text: chatMessage.value,
        uuid: username,
      };

      pubnub.publish({
        message: messageObject,
        channel: channel,
      });

      chatMessage.setValue("");
    }
  };

  // Create page component
  return (
    <ChatContainer>
      <Log messages={messages} />
      <InputContainer>
        <StyledTextField
          placeholder="Type a message..."
          fullWidth={true}
          value={chatMessage.value}
          onChange={chatMessage.onChange}
          // @ts-ignore
          onKeyDown={handleKeyDown}
          inputProps={{ "aria-label": "Message Field" }}
          autoFocus={true}
          autoComplete={"off"}
          style={{ paddingLeft: "15px" }}
        />
        <Button size="small" color="primary" onClick={publishMessage}>
          <StyledSendIcon />
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default LiveChat;
