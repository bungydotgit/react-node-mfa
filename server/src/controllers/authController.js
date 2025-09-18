import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log("New user: ", newUser);
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error registering the user", message: error.message });
  }
};

export const login = async (req, res) => {
  console.log(`The authenticated user is: ${req.user}`);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
};
export const logout = async (req, res) => {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }

  req.logout((err) => {
    if (err)
      return res.status(400).json({
        message: "User not logged in",
      });

    res.status(200).json({ message: "Logout successfull" });
  });
};

export const setup2FA = async (req, res) => {
  try {
    console.log("The req.user is: ", req.user);
    const user = req.user;

    var secret = speakeasy.generateSecret();
    console.log("The secret object is: ", secret);

    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;

    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.adwaitrao.qzz.io",
      encoding: "base32",
    });
    const qrImageUrl = await qrcode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrcode: qrImageUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error setting up 2FA", message: error.message });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" },
    );

    return res.status(200).json({ message: "2FA successful", token: jwtToken });
  } else {
    return res.status(400).json({ message: "Invalid 2FA token" });
  }
};
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    return res.status(200).json({ message: "2FA reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Error reseting 2FA", message: error });
  }
};
