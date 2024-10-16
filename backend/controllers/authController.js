const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateRegisterUser, validateLoginUser } = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// register User
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();
  const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;
  const htmlTemplate = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #DC7B79; text-align: center;">Welcome to Chef Memo Community!</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Dear ${user.username},</p>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Thank you for joining our community of food enthusiasts! We're excited to have you on board. To get started and unlock all the delicious features of our platform, please verify your email address.</p>
      <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <a href="${link}" style="background-color: #E49795; color: #FFF8F8; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Your Email</a>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Once verified, you'll be able to:</p>
      <ul style="color: #5C3130;">
        <li>Share your favorite recipes</li>
        <li>Discover new culinary inspirations</li>
      </ul>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">If you didn't create an account, please ignore this email.</p>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Happy cooking!</p>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Chef Memo Team</p>
    </div>
  `;
  await sendEmail(user.email, "Verify Your Email - Welcome to Our Community!", htmlTemplate);
  res.status(201).json({ message: 'Welcome aboard! We\'ve sent a verification email to your inbox. Please check and verify your email address to start your journey with us.'});
});

// Login User
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if(!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }
    const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;
    const htmlTemplate = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #DC7B79; text-align: center;">Welcome to Chef Memo Community!</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Dear ${user.username},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Thank you for joining our community of food enthusiasts! We're excited to have you on board. To get started and unlock all the delicious features of our platform, please verify your email address.</p>
        <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
          <a href="${link}" style="background-color: #E49795; color: #FFF8F8; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Your Email</a>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Once verified, you'll be able to:</p>
        <ul style="color: #5C3130;">
          <li>Share your favorite recipes</li>
          <li>Discover new culinary inspirations</li>
        </ul>
        <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">If you didn't create an account, please ignore this email.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Happy cooking!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Chef Memo Team</p>
      </div>
    `;
    await sendEmail(user.email, "Verify Your Email - Welcome to Our Community!", htmlTemplate);
    return res.status(400).json({ message: 'Your account is not verified. Please check your email for the verification link.'});
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});

module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if(!user) {
    return res.status(400).json({ message: "We couldn't find your account. The verification link may be invalid or expired." });
  };
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "The verification link is invalid or has expired. Please request a new verification email." });
  }
  user.isAccountVerified = true;
  await user.save();
  await VerificationToken.deleteOne({ _id: verificationToken._id });
  res.status(200).json({ message: "Congratulations! Your account has been successfully verified. You can now log in and start your culinary journey with us!" });
});
