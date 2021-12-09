// tests/product.test.js

import  mongoose from  "mongoose"

import  * as dbHandler from  "../utils/db-handler"

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe("Testing favorite API routes",()=>{
    
});