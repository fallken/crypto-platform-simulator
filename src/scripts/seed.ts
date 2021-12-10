import mongoose from "mongoose";
import _ from "lodash";
import { User } from "../models";
import { Simulator } from "../models/Simulator";
import { Favorite } from "../models/Favourite";
import { DBURL } from "../config";
import bcrypt from "bcrypt";

(async () => {

  await mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = new User({
    name: 'stocks',
    email: 'email@email.com',
    capital: 123,
    divisa: 'stocks',
    password: await bcrypt.hash("password", 8),
    preferedCryptocurrency: 'bitcoin',
  });

  await user.save();
  const userId = user._id;

  const simulator = new Simulator({
    user: userId,
    startDate: '01/05/2021',
    checkDate: '01/05/2021',
    cryptocurrency: 'bitcoin',
    divisa: 'stocks',
    price: 1234,
    currency: 'USD',
    quantity: 1500,
    cryptoPriceStart: 123,
    cryptoPriceCheck: 123,
  });
  await simulator.save();

  const favorite = new Favorite({
    user: userId,
    name: 'favoritename',
  });
  await favorite.save();

  mongoose.disconnect();
})();
