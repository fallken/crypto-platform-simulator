import mongoose from "mongoose";
import _ from "lodash";
import { User } from "../models";
import { Simulator } from "../models/Simulator";
import { Favorite } from "../models/Favorite";
import { DBURL } from "../config";

(async () => {

  mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = new User({
    name: `String`,
    email: `String`,
    capital: `123`,
    divisa: `String`,
    prefered_cryptocurrency: `String`,
  });
  await user.save();

  const query = { _id: "6093abb3dfd9da1deeae56f2" };
  const idProfile = await User.findOne(query).then((e) => {
    return e?._id;
  });

  const simulator = new Simulator({
    profile_id: idProfile,
    start_date: `01/05/2021`,
    check_date: `01/05/2021`,
    cryptocurrency: `String`,
    divisa: `String`,
    crypto_price_start: `123`,
    crypto_price_check: `123`,
  });
  await simulator.save();

  const favorite = new Favorite({
    profile_id: idProfile,
    favorite1: `String`,
    favorite2: `String`,
    favorite3: `String`,
  });
  await favorite.save();

  mongoose.disconnect();
})();
