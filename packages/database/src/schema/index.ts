import testSchema from './test';
import userSchema from './user';
import sessionSchema from './session';
import verificationSchema from './verification';
import accountSchema from './account';


export default {
    test: testSchema,
    user: userSchema,
    session: sessionSchema,
    verification: verificationSchema,
    account: accountSchema,
};

export { testSchema, userSchema, sessionSchema, verificationSchema, accountSchema };
