const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateEmail, validateNewPassword} = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "No account found with this email address." });
  }
  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
  }
  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;
  const htmlTemplate = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #DC7B79; text-align: center;">Password Reset Request</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Dear ${user.username},</p>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">We received a request to reset your password for your Chef Memo account. If you didn't make this request, you can safely ignore this email.</p>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">To reset your password, click the button below:</p>
      <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <a href="${link}" style="background-color: #E49795; color: #FFF8F8; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">If you didn't request a password reset, please contact our support team immediately.</p>
      <p style="font-size: 16px; line-height: 1.5; color: #5C3130;">Best regards,<br>The Chef Memo Team</p>
    </div>
  `;
  await sendEmail(user.email, "Reset Your Chef Memo Password", htmlTemplate);
  res.status(200).json({message: "Password reset instructions sent. Please check your email and follow the link to reset your password."});
});

module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;
  const user = await User.findById(userId);
  if (!user) {
      return res.status(404).json({
          message: "User not found. The password reset link may be invalid."
      });
  }
  const verificationToken = await VerificationToken.findOne({
      userId: user._id,
      token: token,
  });
  if (!verificationToken) {
      return res.status(400).json({
          message: "Invalid password reset link. Please request a new one."
      });
  }
  res.status(200).json({ message: "Password reset link is valid. You can now proceed to reset your password." });
});

module.exports.resetPasswordCtrl = asyncHandler(async (req,res) => {
  const { error } = validateNewPassword(req.body);
  if(error) {
   return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.userId);
  if(!user) {
   return res.status(400).json({ message: "User not found. The password reset link may be invalid." });
  }
  const verificationToken = await VerificationToken.findOne({
   userId: user._id,
   token: req.params.token,
  });
  if(!verificationToken) {
   return res.status(400).json({ message: "Invalid password reset link. Please request a new one." });
  }
  if(!user.isAccountVerified) {
   user.isAccountVerified = true;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();
  await verificationToken.remove();
  res.status(200).json({ message: "Your password has been successfully reset. You can now log in with your new password." });
});
