
module.exports = (req, resp, next) =>{
    if(!req.user){
        resp.status(401).send({error:'Log In required'});
    }
    else{
        next();
    }
}