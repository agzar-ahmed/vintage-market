

function admin(req, res, next){

    if(req.user.role !== 'admin'){
        return res.status(401).json({msg : 'Access denied'});
    }
   next()
}

module.exports = admin ; 