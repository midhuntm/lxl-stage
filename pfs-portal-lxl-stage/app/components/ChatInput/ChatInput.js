import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';

function ChatInput({ typedMessage, messageChangeHandler, sendMessageHandler }) {
  return (
    <div className="chat-input">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>

      <div className="chat-input-box">
        <FormControl variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={typedMessage}
            onChange={messageChangeHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <AttachmentIcon />
                </IconButton>
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={0}
          />
        </FormControl>
      </div>
      <div className="send_msg_img" onClick={sendMessageHandler}>
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatInput;
