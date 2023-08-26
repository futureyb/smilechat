import request from "./axiosinterface"



export const userLoginApi = (data) => request.post("/login", data)

export const getUserVideoApi = () => request.get("/video", { responseType: 'arraybuffer' })

export const getUserInfoApi = () => request.get("/getUserInfo")


export const getUserFriendsApi = () => request.get("/getfriends")

export const getChatMassAge = (params) =>  request.get("/getChatMassAge",{params})

export const sendChatMassAgeApi = (data) =>  request.post("/sendChatMassAge",data)

//将未读变成已读
export const readChatMassageApi = (data) =>  request.post("/readChatMassage",data)


