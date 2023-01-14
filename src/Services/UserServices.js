import axios from "axios";
import {API_BASE_URL} from "../Constants/ApiConstants";
import authedAxios from "./axiosProvider";

const urls = {
    register: API_BASE_URL + 'Users/register',
    login: API_BASE_URL + 'Users/Token',
    Profile: API_BASE_URL + 'Users',
    editProfile: API_BASE_URL + 'Users/Profile',
    userDuplicate: API_BASE_URL + 'Users/checkUserDuplicate',
    resetPassword: API_BASE_URL + 'Users/ResetPassword',
    verify: API_BASE_URL + 'Users/ActivateUser',
    sendCodeAgain: API_BASE_URL + 'Users/SendCodeAgain',
    forgetPassword: API_BASE_URL + 'Users/ForgotPassword',
    newPasswordOtp: API_BASE_URL + 'Users/ResetPasswordOtp'
}

export const RegisterService = async (userData) => {
    try {
        const result = await axios.post(urls.register, userData);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const LoginService = async (loginInfo) => {
    let bodyFormData = new FormData();
    for (let a in loginInfo) {
        bodyFormData.append(a, loginInfo[a]);
    }
    try {
        const result = await axios.post(urls.login, bodyFormData);

        const token = result.data.access_token;
        localStorage.setItem("token", token);

        const firstName = result.data.firstName;
        localStorage.setItem("firstName", firstName);

        const lastName = result.data.lastName;
        localStorage.setItem("lastName", lastName);

        const userId = result.data.userId;
        localStorage.setItem("userId", userId);

        return result.data;

    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const ProfileService = async (id) => {
    try {
        const result = await authedAxios.get(urls.Profile + `/${id}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const EditProfileService = async (editedUser) => {
    try {
        const result = await authedAxios.put(urls.editProfile, editedUser);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const ResetPasswordService = async (changePassword) => {
    try {
        const result = await authedAxios.post(urls.resetPassword, changePassword);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const ForgetPasswordService = async (phone) => {
    try {
        const result = await axios.post(urls.forgetPassword, phone);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const NewPasswordService = async (editedPassword) => {
    try {
        const result = await axios.post(urls.newPasswordOtp, editedPassword);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const VerifyUserService = async (verificationCode, phoneNumber) => {
    try {
        const result = await axios.get(urls.verify + `?phoneNumber=${phoneNumber}&otpCode=${verificationCode}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const SendCodeAgainService = async (phoneNumber) => {
    try {
        const result = await axios.get(urls.sendCodeAgain + `?phoneNumber=${phoneNumber}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const CheckUserDuplicateService = async (phoneNumber, nationalCode) => {
    try {
        const result = await axios.get(urls.userDuplicate + `?PhoneNumber=${phoneNumber}&NationalCode=${nationalCode}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const UserListService = async (page, size) => {
    try {
        const result = await authedAxios.get(urls.Profile + `?Page=${page}&Size=${size}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const UserListByFirstNameService = async (firstName) => {
    try {
        const result = await authedAxios.get(urls.Profile + `?FirstName=${firstName}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const UserListByLastNameService = async (lastName) => {
    try {
        const result = await authedAxios.get(urls.Profile + `?LastName=${lastName}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};