const Admin = require('../models/admin');

module.exports = {
    async store (req, res) {
        
    },

    async login (req, res) {
        const { user , password } = req.body;
        const userExists = await Admin.findOne({user: user, password: password});

        if (userExists) {
            return res.json(userExists);
        }else{
            return res.json("Usuário não existe");
            
        }
    }
};