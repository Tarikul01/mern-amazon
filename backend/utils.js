import jwt  from "jsonwebtoken"

export const generateToken=(user)=>{
    return jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn:3600,
    });
}
export const isAuth=(req,res,next)=>{
    const authorization=req.headers.authorization;
    if(authorization){
        const token=authorization.slice(6,authorization.length);
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                res.status(401).send({message:err});
            }else{
                req.user=decode;
                next();
               
            }
        })

    }else{
        res.status(401).send({message:'No Token'});
    }
}