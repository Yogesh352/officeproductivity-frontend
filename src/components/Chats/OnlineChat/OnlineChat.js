import React from "react";

const OnlineChat = () => {
  return (
    <div className="flex items-center font-normal cursor-pointer mt-4">
      <div className="flex items-center font-normal cursor-pointer relative">
        <img
          className="w-8 h-8 rounded-full object-cover mr-5"
          src="https://picsum.photos/200"
          alt="profile"
        />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-green-500 bottom-0 right-5"></div>
      </div>
      <span>John Doe </span>
    </div>
  );
};
//chatOnline
//chatOnlineFriend
//chatOnlineImgContainer
//chatOnlineBadge
//chatOnlineName

export default OnlineChat;
