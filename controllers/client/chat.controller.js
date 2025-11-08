const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");


// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  const roomChatId = req.params.roomChatId;

  // SocketIO
  _io.once("connection", (socket) => {
    socket.join(roomChatId); 

    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // lưu vào DB
      const chat = new Chat({
        user_id: userId,
        content: content,
        room_chat_id: roomChatId
      });
      await chat.save();

      //  Trả data về cho client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: content,
      });
    });

    // Typing
    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
    // End Typing
  });
  // End SocketIO

  //  Lấy data từ DB

  const chats = await Chat.find({
    deleted: false,
    room_chat_id: roomChatId
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");

    chat.infoUser = infoUser;
  }
  // End lấy data từ DB

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
