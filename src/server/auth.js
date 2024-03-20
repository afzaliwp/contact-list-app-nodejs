import passport from "passport";
import LocalStrategy from 'passport-local';
import JWT, {ExtractJwt} from 'passport-jwt';
import {createUser, getUser} from "./controllers/users.js";
import md5 from "md5";
import configs from "../configs/database.cjs";

passport.use('signup', new LocalStrategy(
    {
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            const user = await createUser({
                fullName: req.body.fullName,
                username,
                password
            });

            done(null, user);
        } catch (e) {
            done(e);
        }
    }
));

passport.use(
    'login', new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await getUser({
                    username,
                });

                if (!user) {
                    done(new Error('Invalid username!'));
                }

                if (md5(password) !== user.password) {
                    done(new Error('Invalid password!'));
                }

                done(null, user);
            } catch (e) {
                console.error(e);
                done(e);
            }
        }
    )
);

passport.use('jwt-verify', new JWT.Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configs.jwtSecret,
        }, function (jwtPayload, done) {
            try {
                done(null, jwtPayload);
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    )
);