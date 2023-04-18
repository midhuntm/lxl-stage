import React from 'react';

function ChatLayout({ chats }) {
  return (
    <>
      {chats.map((chat) => {
        if (chat.sender) {
          return (
            <div className="incoming_msg">
              <div className="incoming_msg_img">
                <img src={chat.profilePic} alt="sunil" />
              </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <span className="time_date">{chat.time}</span>
                  <p className="chat-text">{chat.message}</p>
                  <span class="reply-part"> Reply </span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="outgoing_msg">
              <div className="sent_msg">
                <span className="time_date">{chat.time}</span>
                <p className="chat-text">{chat.message}</p>
                <span class="reply-part"> Reply </span>
              </div>
              <div className="incoming_msg_img">
                <span className="user-avtar">ME</span>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
// dsdhdjhsak

export default ChatLayout;
