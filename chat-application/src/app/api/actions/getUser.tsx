import userModel from "../lib/models/UserModel";

const getUser = async (id: string) => {
  await userModel.findById(id).then((data) => {
    console.log(data)
    return data;
  });
};

export default getUser;
