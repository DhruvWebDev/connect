const password = "super-secure-pa$$word";


  console.log(bcryptHash);

  const isMatch = await Bun.password.verify(password, bcryptHash);
  console.log(isMatch);