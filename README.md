## Amazon Todo Assessment

### How to run

- [backend readme](https://github.com/iceknight17/amazon-todo-assessment/tree/master/backend#readme)
- [frontend readme](https://github.com/iceknight17/amazon-todo-assessment/tree/master/frontend#readme)

### Feature Improvements

#### 1. Drag & Drop Functionality
The application integrates **drag and drop** functionality, allowing users to easily move Todo tickets between different categories. This feature enhances the user experience by providing an intuitive and seamless way to organize and manage tasks.

##### Key Implementation Details:
- Utilized the [React DnD](https://react-dnd.github.io/react-dnd/about) library for implementing drag and drop interactions.
- Users can drag a Todo ticket from one category and drop it into another.
- The state is dynamically updated to reflect the new position of the Todo ticket.

#### 2. API Data Formatting with Lodash
To ensure consistency in API requests and responses, the **Lodash** library is used for converting object keys between **camelCase** and **snake_case** formats. This makes it easier to work with backend APIs that require specific key formats.

##### Key Implementation Details:
- Used Lodash’s `_.mapKeys()` method to switch between key formats when sending data to and receiving data from the API.
- This method ensures that the API communicates in the required format without any additional manual conversions or boilerplate code.


### Overview

![image](https://github.com/user-attachments/assets/809c4b1a-46ad-45ad-b6b6-0a106dc64a04)
