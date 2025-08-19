import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const login = async (req,res) =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false,message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'})

        return res.status({200}.json({success:true,message:"login duccrssfully",token,user:{id:user._id,name:user.name
        
        const auth = () => {
          return (
            <div>

            </div>
          )
        }
        
        export default auth
        }))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
}