const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const prisma = require('../config/db')

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) return done(null, false, { message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Invalid email or password' });

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    
    done(null, user);
});

module.exports = passport;
