import React, { useEffect, useRef } from "react";
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import { useAuth } from "../contexts/authContext";
const projectId = "33aad286-c8c7-4df1-bbc5-559780945e4f";
const projectKey = "7a5f546a-dd0f-4a7e-b0ea-aeecaad233c5";

const Messages = () => {
  const { currentUserDB } = useAuth();
  const { isAdmin } = currentUserDB;
  const username = currentUserDB.isAdmin ? "Admin" : currentUserDB.email,
    secret = currentUserDB.isAdmin ? "azerty&23" : currentUserDB._id;

  console.log("YAHOOO", currentUserDB);

  useEffect(() => {
    if (currentUserDB.isAdmin) return;

    const getOrCreateChatUser = async () => {
      const myHeaders = new Headers();
      myHeaders.append("PRIVATE-KEY", projectKey);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username,
        secret,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          "https://api.chatengine.io/users/",
          requestOptions
        );
        let result = await response.text();
        result = JSON.parse(result);
        console.log(result);
      } catch (error) {
        console.log("Error while connecting to chat", error);
        throw new Error(
          "Oups, nous avons eu une erreur en nous connectant au chat!"
        );
      }
    };

    getOrCreateChatUser();
  }, [currentUserDB]);

  const chatProps = useMultiChatLogic(projectId, username, secret);

  return (
    <div className="border border-orange-500 h-[calc(80vh)]">
      {/* 3. COMPONENT */}
      {isAdmin ? (
        <MultiChatWindow
          {...chatProps}
          renderChatHeader={() => {
            return (
              <div className="w-full text-2xl font-bold text-font-bold pt-3 text-center">
                Messages
              </div>
            );
          }}
        />
      ) : (
        <MultiChatWindow
          {...chatProps}
          renderChatHeader={() => {
            return (
              <div className="w-full text-2xl font-bold text-font-bold pt-3 text-center">
                Messages
              </div>
            );
          }}
          renderChatForm={() => {
            return (
              <div className="w-full text-2xl font-bold text-font-bold py-3 text-center">
                Vos discussions
              </div>
            );
          }}
          renderOptionsSettings={() => {
            return;
          }}
          renderPeopleSettings={() => {
            return;
          }}
        />
      )}
      {/* 4. SOCKET */}
      <MultiChatSocket {...chatProps} />
    </div>
  );
};

export default Messages;
