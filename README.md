# Scandiweb Junior React Client-Side Code

Welcome to the Scandiweb Junior React Client-Side Code repository! This project showcases a React application built with React , Redux and TypeScript.  
<br/>
It employs custom Redux middlewares, hooks for toast functionality, and utilizes Sass for styling. Additionally, 
the application supports translation in three languages. The repository includes two main pages, the PDP (Product Detail Page) and the ProductAdd Page, each with their distinct features.

## Table of Contents

- [Features](#features)
  - [General](#general-features)
  - [PDP Page Features](#pdp-page-features)
  - [ProductAdd Page Features](#productadd-page-features)


## Features

### General Features

1. **TypeScript**: Since ScandiPWA recently migrated to TypeScript, The project also uses TypeScript, enhancing code quality, and enabling better type safety and development experience.

2. **Redux with TypeScript**: Redux is used for state management, and the codebase is fully typed with TypeScript for robustness and maintainability.

3. **Custom Redux Middlewares**: Custom middleware has been implemented for `refetching` and `logging` features to extend the capabilities of Redux and handle asynchronous actions effectively.

4. **Custom Hooks**: The project includes custom hooks for toast functionality and Redux-related operations, making the codebase more organized and reusable.

5. **Scandiweb Convention**: The codebase follows Scandiweb's convention of separating business logic and component logic into parent and component files, promoting clean code practices.

6. **Sass Styling**: The project uses Sass for styling, in line with Scandiweb's preferred styling approach.

7. **Translation Support**: The application is multilingual and supports translation in three languages, enhancing its accessibility to users from different regions.

### PDP Page Features

1. **Button Behavior**: The loading button on the PDP page is disabled when data is loading or when there is no data to delete, providing a smooth user experience.

2. **Multiple Currency Options**: Users can choose from multiple currency options on the PDP page, allowing them to view product prices in their preferred currency.

3. **Clean Code**: The PDP page codebase adheres to best practices, ensuring clean and maintainable code for future development and bug fixes.

### ProductAdd Page Features

1. **Product Attribute Handling**: The ProductAdd page handles product attributes gracefully with an attribute map, providing a scalable solution for managing product variations.

2. **Validator Map**: The project utilizes a validator map to validate product attributes using regex, and it also provides meaningful error messages for invalid inputs.

