import app from "./app";
import * as config from "./config";
import mongoose from "mongoose";
import { DBURL } from './config';

const port = config.PORT;
//handling errors if any happens
//setup the database connection before starting the application 
mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // start server
    app.listen(port, () =>
      console.log(`✅  Ready on port http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log(`Error connecting ${DBURL}`);
    throw err;
  });


//myname is esi