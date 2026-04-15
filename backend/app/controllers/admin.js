const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../../config/constants.js");
const User = require('../models/user.js'); // Adjust path to your User model

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testnode45@gmail.com",
    pass: "hxupclqckqwljqxj",
  },
});

module.exports = function () {
  let module = {};

  module.login = async function (req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ message: 'No Data Found' });
      }

      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }

      const token = jwt.sign({ id: user._id }, config.jwt_secret, { expiresIn: '24h' });

      user.last_login = new Date();
      user.token = token;
      await user.save();  // Update user with new token and last_login

      const details = {
        id: user._id,
        name: user.name,
        jwt_token: token,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
        profile: user.profile,
        status: user.status,
        last_login: user.last_login
      };

      return res.status(200).json({ message: 'Login success', data: details });

    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  }

  module.forgetPassword = async function (req, res) {
    let emailId = req.body.email;
    try {
      let userDetail = await User.findOne({ email: emailId });

      if (!userDetail) {
        return res.status(404).json({ success: false, message: 'Email not found' });
      }

      let newPassword = generatePassword(8);
      let mailOptions = {
        from: "no-reply@aistechnolabs.com",
        to: emailId,
        subject: "EZ CMS : Forgot Password",
        html: `<p>Hello ${userDetail.name},<br><br>Your new password is: <b>${newPassword}</b></p>`,
      };

      let send = await transporter.sendMail(mailOptions);
      if (send) {
        console.log("newPassword", newPassword);
        userDetail.password = bcrypt.hashSync(newPassword, 10);
        await userDetail.save(); // Save updated password

        return res.status(200).json({ success: true, message: 'New Password sent on your email address' });
      } else {
        return res.status(500).json({ success: false, message: 'Failed to send new password' });
      }

    } catch (err) {
      console.error("forgot password: ", err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };


  module.changepasswordPost = async function (req, res) {
    try {
      const { newpassword, oldpassword } = req.body;
      const { userId } = req.query;

      const userDetail = await User.findById(userId);

      if (!userDetail) {
        return res.status(404).json({ message: "User not found." });
      }
      console.log("oldpassword, userDetail.password", oldpassword, userDetail.password);

      const result = bcrypt.compareSync(oldpassword, userDetail.password);
      console.log("result", result);
      if (result) {
        userDetail.password = bcrypt.hashSync(newpassword, 10);
        await userDetail.save(); // Save updated password

        return res.status(200).json({ message: "Password changed successfully." });
      } else {
        return res.status(400).json({ message: "Bad request, Passwords don't match." });
      }
    } catch (err) {
      console.error("Password change error: ", err);
      return res.status(500).json({ message: "Password not changed, please try again." });
    }
  };


  module.updateprofile = async function (req, res) {
    try {
      let { name, mobile, email } = req.body;
      let { userId } = req.query;

      let userDataCheck = await User.findById(userId);

      if (!userDataCheck) {
        return res.status(400).json({ status: 400, message: "Admin not found" });
      }

      userDataCheck.name = name;
      userDataCheck.mobile = mobile;
      userDataCheck.email = email;

      if (req.files?.profileImage) {
        let image = req.files.profileImage;
        let imageName = "admin_" + Date.now() + ".png";

        await image.mv("./public/upload/admin/" + imageName, async (err) => {
          if (err) {
            console.log('image upload error', err);
          } else {
            // Optional: Delete the old image file
            fs.unlink('./public' + userDataCheck.profile, (err) => {
              if (err) {
                console.error(`Error deleting file: ${err}`);
              }
            });
          }
        });
        userDataCheck.profile = "/upload/admin/" + imageName;
      }

      await userDataCheck.save();
      return res.status(200).json({ status: 200, message: "profile update successfuly" });

    } catch (error) {
      console.error("DetailUpdate error: ", error);
      return res.status(500).json({ status: 500, message: "DetailUpdate error:" });
    }
  };


  module.viewAdmin = async function (request, response) {
    try {
      let { userId } = request.query;

      if (!userId) {
        return response.status(400).json({ status: 400, message: "User ID is required" });
      }

      let userDataCheck = await User.findOne({ _id: userId, isDelete: false });

      if (!userDataCheck) {
        return response.status(400).json({ status: 400, message: "Admin not found" });
      }

      // Assuming permission is stored as a JSON string
      userDataCheck.permission = JSON.parse(userDataCheck.permission);

      return response.status(200).json({
        status: 200,
        message: "Admin viewed successfully.",
        data: userDataCheck,
      });

    } catch (error) {
      console.error("ViewAdmin error: ", error);
      return response.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };

  return module

}

function generatePassword(length) {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz#$%^&@";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
