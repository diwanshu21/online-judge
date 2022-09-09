function logout_get(req, res) {
  res.cookie("jwt", "hello", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).redirect("/");
}

module.exports = { logout_get };
