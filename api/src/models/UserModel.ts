import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'a user must have a name'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    email: {
      type: String,
      required: [true, 'a user must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'invalid email'],
    },
    password: {
      type: String,
      required: [true, 'user must provide a password'],
      minlength: [8, 'Password must be atleast 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'please confirm your password'],
      minlength: 8,
      validate: [passwordConfirmValidator, "passwords doesn't match"],
    },
  },
  { timestamps: true }
);

function passwordConfirmValidator(this: IUser, field: string): boolean {
  return field === this.password;
}

// MIDDLEWARES
// 1. HASHING PASSWORD
userSchema.pre('save', async function (next) {
  // Incase of updating other user data skip updating password
  if (!this.isModified('password')) return next();
  // Incase of updating password
  // - 1) hash password
  this.password = await bcrypt.hash(this.password as string, 12);
  // - 2) delete passwordConfirm
  this.passwordConfirm = undefined;
});

// 2. COMPARE PASSWORDS
userSchema.methods.comparePasswords = async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isEqual = await bcrypt.compare(password, hashedPassword);
  return isEqual;
};

const User = mongoose.model('User', userSchema);
export default User;
