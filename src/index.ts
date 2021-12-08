import app from "./app";
import * as config from "./config";

const port = config.PORT;
//handling errors if any happens
// start server
app.listen(port, () => console.log(`✅  Ready on port http://localhost:${port}`));
