const User = require("app/models/User");



//*>---------- middleware

const ROLES_LIST = require("../../../config/roles_list");


//*>---------- method get user of userRole

const getUserRole =async (req,res)=>{

    const usersRole = await User.find({"roles.User": 1000});

    console.log(usersRole);
    res.json({usersRole});

}


//*>------------ export method

module.exports = {
  getUserRole,
};