// Check for User Admin
const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send('Not authorized as Admin')
    }
};

export default authorizeAdmin;