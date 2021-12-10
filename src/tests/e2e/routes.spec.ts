// tests/product.test.js
import request from "supertest";

import mongoose from "mongoose";

import app from "../../app";

import { DBURL } from "../../config";

/**
 * Connect to real database and remove the test db after the tests are done
 */
beforeAll(async () => {
  mongoose
    .connect(`${DBURL}/testable`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongo");
    });
});

/**
 * Removing collections and  close the db connection.
 */
afterAll(async () => {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  await Promise.all(
    collections.map(async (collection) => {
      await db.dropCollection(collection.name);
    })
  );

  mongoose.connection.close();
});

describe("testing user,favorite,simulator routes", () => {
  let authToken;

  describe("auth tests", () => {
    const path="/api/user",userInputData = {
      email: "test@gmail.com",
      name: "test",
      nickname: "testNickname",
      password: "password",
      divisa: "stocks",
      prefered_cryptocurrency: "bitcoin",
      capital: 123,
    };

    test("invlid email provided", async () => {
      const invalidData = {
        ...userInputData,
        email: "invalid",
      };
      await request(app)
        .post(`${path}/register`)
        .send(invalidData)
        .expect(400)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(400);
          expect(response.body.meta.detail.errors[0].param).toBe("email");
        });
    });

    test("success user register", async () => {
      await request(app)
        .post(`${path}/register`)
        .send(userInputData)
        .expect(200)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(200);
          expect(response.body.data).toMatchObject(
            expect.objectContaining({
              name: userInputData.name,
              email: userInputData.email,
            })
          );
        });
    });


    test("duplicate user register error", async () => {
      await request(app)
        .post(`${path}/register`)
        .send(userInputData)
        .expect(403)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(403);
        });
    });

    test("login user", async () => {
      const loginInput = {
        email: userInputData.email,
        password: userInputData.password,
      };
      await request(app)
        .post(`${path}/login`)
        .send(loginInput)
        .expect(200)
        .then((response: any) => {
          //  console.log(JSON.stringify(response.body))

          expect(response.body.data).toMatchObject(
            expect.objectContaining({
              name: userInputData.name,
              email: userInputData.email,
              token: expect.any(String),
            })
          );
          authToken = response.body.data.token;
        });
    });

    test("invalid login credentials", async () => {
      const loginInput = {
        email: userInputData.email,
        password: "wrongPassword",
      };
      await request(app)
        .post(`${path}/login`)
        .send(loginInput)
        .expect(401)
        .then((response: any) => {
          //  console.log(JSON.stringify(response.body))
          expect(response.body.meta.code).toBe(401);
        });
    });

    test("valid token user profile", async () => {
      await request(app)
        .get(`${path}/profile`)
        .set("Authorization", authToken)
        .expect(200)
        .then((response: any) => {
          expect(response.body.data).toMatchObject(
            expect.objectContaining({
              name: userInputData.name,
              email: userInputData.email,
            })
          );
        });
    });

    test("invalid token user profile", async () => {
      await request(app)
        .get(`${path}/profile`)
        .set("Authorization", "invalidToken")
        .expect(401)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(401);
        });
    });
  });

  describe("favorite tests", () => {
    const path="/api/favorite",favoriteInputData = {
      name: "crupto",
    };

    test("add favorite item for user", async () => {
      await request(app)
        .post(`${path}/add`)
        .set("Authorization", authToken)
        .send(favoriteInputData)
        .expect(200)
        .then((response: any) => {
          expect(response.body.data).toMatchObject(
            expect.objectContaining({
              name: favoriteInputData.name,
            })
          );
        });
    });

    test("without authorization token", async () => {
      await request(app)
        .post(`${path}/add`)
        .send(favoriteInputData)
        .expect(401)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(401);
        });
    });

    test("invalid input to create user favorite ", async () => {
      await request(app)
        .post(`${path}/add`)
        .set("Authorization", authToken)
        .send({})
        .expect(400)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(400);
        });
    });


    test("get all favorite items", async () => {
        await request(app)
          .get(`${path}/`)
          .set("Authorization", authToken)
          .expect(200)
          .then((response: any) => {
            expect(response.body.meta.code).toBe(200);
            expect(response.body.data.items[0]).toMatchObject(
                expect.objectContaining({
                  name: favoriteInputData.name,
                })
            );
          });
    });
  
    test("get user's favorite items", async () => {
        await request(app)
          .get("/api/user/favorites")
          .set("Authorization", authToken)
          .expect(200)
          .then((response: any) => {
            expect(response.body.meta.code).toBe(200);
            expect(response.body.data.items[0]).toMatchObject(
                expect.objectContaining({
                  name: favoriteInputData.name,
                })
            );
          });
    });
  });


  describe("simulator tests", () => {
    const path="/api/simulator",simulatorInputData = {
        name:"test simulator",
        start_date:"10/09/1991" ,
        check_date:"14/09/1991",
        cryptocurrency:"BTC",
        divisa:"cripto",
        crypto_price_start: 123,
        crypto_price_check: 123,
        price: 110.2,
        quantity:12,
        currency:"USD"
    };

    test("add simulator item for user", async () => {
      await request(app)
        .post(`${path}/add`)
        .set("Authorization", authToken)
        .send(simulatorInputData)
        .expect(200)
        .then((response: any) => {
          expect(response.body.data).toMatchObject(
            expect.objectContaining({
              name: simulatorInputData.name,
              cryptocurrency: simulatorInputData.cryptocurrency,
              price: simulatorInputData.price,
              quantity: simulatorInputData.quantity,
              divisa: simulatorInputData.divisa,
            })
          );
        });
    });

    test("without authorization token", async () => {
      await request(app)
        .post(`${path}/add`)
        .send(simulatorInputData)
        .expect(401)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(401);
        });
    });

    test("invalid input to create user simulator ", async () => {
      await request(app)
        .post(`${path}/add`)
        .set("Authorization", authToken)
        .send({})
        .expect(400)
        .then((response: any) => {
          expect(response.body.meta.code).toBe(400);
        });
    });


    test("get all simulator items", async () => {
        await request(app)
          .get(`${path}/`)
          .set("Authorization", authToken)
          .expect(200)
          .then((response: any) => {
            expect(response.body.meta.code).toBe(200);
            expect(response.body.data.items[0]).toMatchObject(
                expect.objectContaining({
                  name: simulatorInputData.name,
                })
            );
          });
    });
  
    test("get user's simulator items", async () => {
        await request(app)
          .get("/api/user/simulators")
          .set("Authorization", authToken)
          .expect(200)
          .then((response: any) => {
            expect(response.body.meta.code).toBe(200);
            expect(response.body.data.items[0]).toMatchObject(
                expect.objectContaining({
                  name: simulatorInputData.name,
                })
            );
          });
    });
  });
});
