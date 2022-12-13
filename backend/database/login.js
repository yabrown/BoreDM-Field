// checks whether username/password combo eists in db
// written by: Max
// (Danny, see this)
async function login(username) {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    });

    console.log(user);

    if (!user) {
      return null;
    }
    return user.hashed_password;
  } catch (err) {
    console.error(err);
  }
}

async function register(username, hashed_password, name) {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      await User.create({ username, hashed_password, name });
      console.log('success registering!');
      return true;
    }
    console.log('failed registering!');
    return false;
  } catch (err) {
    console.error(err);
  }
}