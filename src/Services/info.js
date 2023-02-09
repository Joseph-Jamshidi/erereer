export const firstName = localStorage.getItem("firstName");
export const lastName = localStorage.getItem("lastName");
export const userId = localStorage.getItem("userId");
export const token = localStorage.getItem("token");
export const profile = JSON.parse(localStorage.getItem("Profile"));

export const UserInfo = {firstName: firstName, lastName: lastName, userId: userId, profile: profile};