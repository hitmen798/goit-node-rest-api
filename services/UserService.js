const UserModel = require("../models/user");
const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
class UserService {
  constructor() {
    this.model = UserModel;
  }

  findUser = async (req, option) => {
    const user = await this.model.findOne(
      { [option]: req }
    );
    return user || null;
  };

  createUser = async (body) => {
    const password = await bcrypt.hash(body.password, 10);
    const { name, email, subscription, token, avatarURL } =
      await this.model.create({
        ...body,
        password,
      });
    return { name, email, subscription, token, avatarURL } || null;
  };
}

module.exports = new UserService();
