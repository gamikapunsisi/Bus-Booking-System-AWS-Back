// Authentication DTOs
class LoginRequestDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class LoginResponseDto {
    constructor(accessToken, refreshToken, expiresIn, userType) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.userType = userType;
    }
}

class RegisterCommuterDto {
    constructor(email, password, confirmPassword, firstName, lastName, phoneNumber, nic) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.nic = nic;
    }
}

module.exports = {
    LoginRequestDto,
    LoginResponseDto,
    RegisterCommuterDto
};