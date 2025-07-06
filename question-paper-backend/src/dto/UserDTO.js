class UserDTO {
  constructor({ name, email, profileImage, role, _id }) {
    this.name = name;
    this.email = email;
    this.profileImage = profileImage;
    this.role = role;
    this.userId = _id; 
    }
}

module.exports = UserDTO;
