# Belluxe Atelier

## Overview
Belluxe Atelier is a modern e-commerce application designed for showcasing and selling jewelry and accessories. The application features an admin interface for managing products, including adding, editing, and deleting items, as well as a user-friendly frontend for browsing and purchasing products.

## Project Structure
The project is organized into several key directories:

- **prisma/**: Contains the Prisma schema file for defining the database structure.
- **src/**: The main source code of the application.
  - **app/**: Contains the application routes and components.
    - **admin/**: Admin interface for managing products.
    - **api/**: API routes for handling product data.
    - **(main)**: Main application components and pages.
  - **components/**: Reusable React components for the application.
  - **lib/**: Utility functions and database connection logic.
  - **types/**: TypeScript types and interfaces for type safety.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- A PostgreSQL database (or any other supported database)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd belluxe-atelier
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory and add your database connection string and any other necessary environment variables.

4. Set up the database:
   - Run the following command to create the database schema:
   ```
   npx prisma migrate dev --name init
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
The application will be available at `http://localhost:3000`.

### Admin Interface
- Access the admin interface at `/admin`.
- Use the product management features to add, edit, or delete products.

### API Endpoints
- **GET /api/products**: Fetch a list of products.
- **POST /api/products**: Create a new product.
- **GET /api/products/[id]**: Fetch a specific product by ID.
- **PUT /api/products/[id]**: Update a specific product by ID.
- **DELETE /api/products/[id]**: Delete a specific product by ID.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.