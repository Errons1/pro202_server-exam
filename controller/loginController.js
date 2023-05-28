import LoginService from "../services/LoginService.js";
export const requestUser = async (req, res, next) => {
  const { userName } = req.signedCookies;
  const { rows } = await LoginService.requestUser(userName);
  console.log(rows);
  if (rows.length > 0) {
    req.user = { userName: rows[0].userName, role: rows[0].role };
  }

  next();
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  if (userName === "" || password === "") {
    return res.sendStatus(403);
  }
  console.log();
  const user = userName.toLowerCase();
  const { rows } = await LoginService.loginUser(user, password.toLowerCase());
  console.log(rows);
  res.cookie("userName", rows[0].userName, { signed: true });
  res.cookie("role", rows[0].role, { signed: true });
  res.sendStatus(200);
};
