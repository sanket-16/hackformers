const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = require('./prisma')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: jwt_payload.id
            }
        })

        console.log(user);
        if (user) return done(null, user);

    } catch (error) {
        return done(error, false)
    }
}));

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:8080/auth/callback"
//   },
//   async (accessToken, refreshToken, profile, done)=>{
          
//       try {
//         const user = await prisma.google_User.findUnique({where:{
//             googleId:profile.id
//           }})
//         //   console.log(user);
//           if(!user){
//             const newUser = await prisma.google_User.create({
//                 data:{
//                     name:profile.displayName,
//                     email:profile.emails[0].value,
//                     googleId:profile.id
//                 }
//             })
//             // console.log(newUser);
    
//             if(newUser) done(null,newUser);
//           }
//           else{
//             done(null,user)
//           }
//       } catch (error) {
//         return done(error,false)
//       }
//   }
  
// ));

// passport.serializeUser((user,done)=>{
//     return done(null,user.id);
// })

// passport.deserializeUser(async (id,done)=>{
//      await prisma.google_User.findUnique({where:{id:id}}).then((data)=>{
//         return done(null,data)
//      })
// })