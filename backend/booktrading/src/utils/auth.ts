const isLoggedIn = (req: any, res: any, next: any) => {
  if (req.user) {
    next();
  } else {
    res.status(400).json({ message: "unauthed" });
  }
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.type_of_user === "admin") {
    next();
  } else {
    res.status(400).json({ message: "unauthed" });
  }
};

export { isLoggedIn, isAdmin };
