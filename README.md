# Full-Stack Enterprise Asset Management System

A robust, scalable, and responsive Full-Stack web application built with **C# (.NET 10)** for the backend and **Vanilla JavaScript + Bootstrap 5** for the frontend. This system allows organizations to track, update, and monitor their physical assets such as IT equipment, facility infrastructure, and corporate vehicles efficiently.

## 📸 Dashboard Preview
*<img width="2636" height="1514" alt="localhost" src="https://github.com/user-attachments/assets/1f6ddcb9-7a73-4ae9-8b0f-e2ba4280c14f" />
*

## 🚀 Tech Stack

**Back-End:**
* **Framework:** ASP.NET Core Web API (.NET 10)
* **Language:** C#
* **ORM:** Entity Framework Core (EF Core)
* **Database:** SQLite (for persistent local storage)
* **Documentation:** Swagger UI

**Front-End:**
* **UI Framework:** Bootstrap 5 & Bootstrap Icons
* **Language:** HTML5, CSS3, Vanilla JavaScript
* **Architecture:** Served as static files via ASP.NET Core `wwwroot` (Monolithic Architecture)

## ⚙️ Key Features
* **Unified Full-Stack Experience:** Frontend and Backend are smoothly served from a single, integrated .NET server.
* **Full CRUD Operations:** Create, Read, Update, and Delete asset records seamlessly across the UI and database.
* **Bulk Insert Capability:** Efficiently add multiple asset records at once using the custom `/bulk` endpoint.
* **Modern Client-Side Pagination:** Fast and responsive data slicing to ensure a clean UI without overloading the server.
* **Dynamic Connection Sensor:** Real-time UI feedback indicating whether the API server is online or offline.

## 🛠️ How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/irfan-mpan30/EnterpriseAssetAPI.git
2. Navigate to the project directory:
   ```bash
   cd EnterpriseAssetAPI
3. Initialize the Database:
   Since the database file is ignored by Git, you need to apply migrations to create the SQLite schema:
   ```bash
   dotnet ef database update
   *Note: If you don't have EF Core tools installed
4. Run the application:
   ```bash
   dotnet run
5. Access the Application in your browser:
🖥️ Web Dashboard (Frontend): Navigate to http://localhost:5222 (e.g., http://localhost:5222)
⚙️ API Documentation (Swagger): Navigate to http://localhost:5222/swagger
