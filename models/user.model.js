

const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const bcrypt = require("bcryptjs");
const config = require("../config/config");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {

      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // https://www.npmjs.com/package/validator
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },

    },
    password: {
      type: String,

      required: true,
      trim: true,
      minlength: 8,

      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },

      // private: true, // used by the toJSON plugin

    },
    walletMoney: {

      type: Number,
      required: true,
      default: config.default_wallet_money,

    },
    address: {
      type: String,
      default: config.default_address,
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

// TODO (Rohin) - Evaluate if we can teach why we need the toJSON Plugin.
// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);



/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {

  const user = await this.findOne({ email });
  return !!user;

};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {

  const user = this;
  return bcrypt.compare(password, user.password);

};


// NOTE - Quiz or mention in debrief on next() - middleware?
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});




/**
 * @typedef User
 */

const User = mongoose.model("User", userSchema);

module.exports.User = User;

