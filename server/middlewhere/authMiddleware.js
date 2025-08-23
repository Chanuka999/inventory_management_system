

const authMiddleware = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false,message:"No token provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success:false,message:"Invalid token"})
        }
    }
}