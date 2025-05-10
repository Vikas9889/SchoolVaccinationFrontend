# Vaccination Drive Dashboard

This is a web application built with **React** and **Tailwind CSS** to manage and track vaccination drives. The dashboard displays the total number of students vaccinated, the upcoming vaccination drives, and other relevant data.

## Features

- **Total Students**: Shows the total number of students.
- **Vaccinated**: Displays the number of students vaccinated.
- **Vaccination Percentage**: Calculates and displays the percentage of vaccinated students.
- **Upcoming Vaccination Drives**: Displays a list of upcoming drives with details such as drive name, vaccine type, and scheduled date.

## Technologies Used

- **React** for building the user interface.
- **Tailwind CSS** for styling the application.
- **React Router** for navigation between components.
- **Git** for version control.

## API Endpoints

### Drive Endpoints
| Method | Endpoint                                | Description                          |
|--------|----------------------------------------|--------------------------------------|
| GET    | /drives                                | Get all drives                      |
| GET    | /drives/:id                            | Get drive by ID                     |
| POST   | /drives                                | Create new drive                    |
| PUT    | /drives/:id                            | Update existing drive               |
| GET    | /drives/upcoming                       | Get upcoming drives (next 30 days)  |
| GET    | /drives/dashboard                      | Dashboard overview (aggregate)      |
| GET    | /drives/v1/vaccination-drives          | Get all drives (alias)              |
| POST   | /drives/v1/vaccination-drives          | Create new drive (alias)            |
| GET    | /drives/v1/vaccination-reports         | Generate summary report (alias)     |

### Student Endpoints
| Method | Endpoint                                | Description                          |
|--------|----------------------------------------|--------------------------------------|
| POST   | /v1/students                           | Add a new student                   |
| GET    | /v1/students                           | Get all students                    |
| GET    | /v1/students/:id                       | Get a student by ID                 |
| PUT    | /v1/students/:id                       | Update a student by ID              |
| DELETE | /v1/students/:id                       | Delete a student by ID              |

### Vaccination Record Endpoints
| Method | Endpoint                                | Description                          |
|--------|----------------------------------------|--------------------------------------|
| GET    | /v1/students/:id/vaccination-records   | Get vaccination records for student |
| POST   | /v1/students/vaccination-records       | Add or update vaccination record    |

## Setup Instructions

### 1. Clone the repository
First, clone this repository to your local machine using the following command:
```bash
git clone https://github.com/your-username/vaccination-dashboard.git
```

### 2. Navigate to the project directory
```bash
cd vaccination-dashboard
```

### 3. Install the required dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```

### 5. Open the application in your browser
Visit [http://localhost:3000](http://localhost:3000) to view the application.
