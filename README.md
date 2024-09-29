# Micro Project using JsonPowerDB

# Description:
The project is a Student Enrollment Form that leverages JsonPowerDB for backend database operations such as adding, updating, and retrieving student records. The form includes fields like roll number, name, class, birthdate, address, and enrollment date. It dynamically enables/disables the save, update, and reset buttons based on the input values, ensuring a smooth user experience.

JsonPowerDB is chosen for its simplicity, ease of use, and RESTful APIs, making it an ideal choice for lightweight projects requiring fast and efficient database management.

# Benefits of using JsonPowerDB:
1. Simplified RESTful APIs: JsonPowerDB offers a straightforward interface for managing database operations (CRUD) through simple API calls.
2. Low-latency and High Performance: JsonPowerDB is lightweight and offers near real-time performance for fast data handling.
3. NoSQL Database: It supports dynamic schema structures, allowing flexible storage and retrieval of records.
4. Security Features: Built-in token-based security with JsonPowerDB ensures a secure interaction between the client and the database.
5. Minimal Setup: Requires minimal setup, with no need for complex installations and configurations.

# Table of Contents:
1. Project Overview
2. Benefits of JsonPowerDB
3. Scope of Functionalities
4. Examples of Use
5. Project Status
6. Sources

# Scope of Functionalities:
The project includes the following functionalities:

1. Create (Save): Allows the user to input student data and save it to JsonPowerDB.
2. Read (Retrieve): Enables fetching a student’s data based on their roll number.
3. Update: Updates student information in the database using a roll number as the key.
4. Reset: Resets the form fields and allows new input.
The dynamic UI ensures that the save, update, and reset buttons are enabled only when appropriate fields are filled.

# Illustrations:
Below is an example of the form interface:



Examples of Use:
Example 1 (Saving a Record): A user inputs a student’s roll number, name, class, birthdate, address, and enrollment date. After entering, the user clicks "Save," which triggers the saveData() function to store the record in JsonPowerDB.
Example 2 (Updating a Record): The user enters an existing roll number, and the system retrieves the corresponding data. After editing the student’s details, clicking "Update" saves the changes.

Project Status:
The project is currently fully functional with the ability to:
1. Save new student records
2. Retrieve records based on the roll number
3. Update existing records
4. Reset the form

   
# Sources:
1. JsonPowerDB Documentation: JsonPowerDB API Docs
2. jQuery Library: jQuery Documentation
3. Bootstrap CSS Framework: Bootstrap Documentation


