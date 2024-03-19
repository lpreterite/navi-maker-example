function Auth() {
  const account = {
    id: "",
    username: "",
  };

  const ctx = {
    login(data) {
      if (data.pwd != "00000000") throw new Error("密码错误");
      account.id = data.name;
      account.username = data.name;
    },
    logout() {
      account.id = "";
      account.username = "";
    },
    isLogin() {
      return account.id != "";
    },
  };

  Object.defineProperties(ctx, {
    account: {
      get: () => account,
    },
  });

  return ctx;
}

const auth = new Auth();
export default auth;
