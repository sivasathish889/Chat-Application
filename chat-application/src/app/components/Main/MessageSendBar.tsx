import React, { useCallback, useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoImageOutline, IoMicOutline } from "react-icons/io5";
import { PiTelegramLogoBold } from "react-icons/pi";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { setMsgStoreInChat } from "../../redux/slices/msgStoreInChatSlice";

const MessageSendBar = () => {
  const dispatch = useDispatch()
  const handleSendData = ()=>{
    dispatch(setMsgStoreInChat({message : inputData || "", date : new Date().toISOString() }))
    setInputData('')
  }
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string | null>("");
  const handleEmojiClick = useCallback(
    (emoji: any) => {
      setInputData((prev) => (prev ?? "") + emoji.emoji);
    },
    []
  );

  return (
    <div className="flex p-3 justify-center items-center ">
      <div className="input-box w-full relative flex justify-center">
        <BsEmojiLaughing
          size={19}
          className="absolute top-3 cursor-pointer left-4 z-10"
          onClick={() => setEmojiOpen(!emojiOpen)}
        />
        <EmojiPicker
          open={emojiOpen}
          onEmojiClick={(emoji) => handleEmojiClick(emoji)}
          style={{ position: "absolute", left: 0, bottom: 40 }}
          height={300}
          width={600}
          searchDisabled
        />
        <input
          type="text"
          name="text"
          id="text"
          className="w-full rounded-full h-10 relative px-10 pe-20 outline-none bg-gray-400/50 text-sm"
          value={inputData ?? ""}
          onChange={(e) => setInputData(e.target.value)}
          onClick={() => setEmojiOpen(false)}
        />
        <IoMicOutline
          size={25}
          className="absolute right-14 bottom-2 cursor-pointer"
        />
        <IoImageOutline
          size={24}
          className="absolute right-4 bottom-2 cursor-pointer"
        />
      </div>
      <div className="send-message m-2 bg-primary p-2 rounded-full cursor-pointer" onClick={handleSendData}>
        <PiTelegramLogoBold size={20} className="opacity-70" />
      </div>
    </div>
  );
};

export default MessageSendBar;
