/** #======================================================#
 *  #    Program or program file : RegisterController.js
 *  #    Description: Receives API call for register a new user
 *  #    Author: Snorre & Micheal
 *  #    Date: 01.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as Services from "../services/CreateService.js";

/**
 * @description Takes inn email and password from user and makes an account
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body */
export async function register(req, res) {
  // Verify username
  const { email, password } = req.body;

  // 403 forbidden
  if (email === "" || password === "") {
    return res.sendStatus(403);
  }

  let exists = await Services.userExists(email);

  console.log("User does " + (exists ? "" : "not ") + "exist");

  if (exists) {
    res.status(409);
    res.send("User already exists");
  }
  // Create user
  // Role is hardcoded because the registration form is only for normal users
  else if ((await Services.addUser(email, password, "casual")) === true) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
}
