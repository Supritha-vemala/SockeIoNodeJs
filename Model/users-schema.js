import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
		},
		profileImage: {
			type: String,
		},
		bioData: {
			type: String,
		},
		posts: {
			type: Array,
		},
		OTP: {
			type: Number,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ collection: "users" }
);

const userModel = mongoose.model("users", UsersSchema);

export default userModel;