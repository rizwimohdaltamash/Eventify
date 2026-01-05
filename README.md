# 🎉 Eventify - Event & Attendee Management Platform

<div align="center">

![React](https://img.shields.io/badge/REACT-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/NODE.JS-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/EXPRESS-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MONGODB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/PRISMA-6.19.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TAILWIND-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TANSTACK_QUERY-5.x-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Vite](https://img.shields.io/badge/VITE-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

### A modern, full-stack event management platform with beautiful UI, real-time updates, and optimistic UI patterns.

Eventify streamlines event organization with comprehensive CRUD operations, automatic capacity validation, cascade delete functionality, and a polished user experience powered by React, Node.js, Express, Prisma, and MongoDB. Features optimistic UI updates for instant feedback, client-side form validation using Zod schemas, beautiful toast notifications with color-coded states, and a responsive gradient design built with TailwindCSS and Shadcn/UI components.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI Framework |
| **Vite** | Latest | Build tool & Dev server |
| **TailwindCSS** | 3.x | Utility-first CSS framework |
| **Shadcn/UI** | Latest | Component library |
| **TanStack Query** | 5.x | Server state management |
| **React Hook Form** | Latest | Form handling |
| **Zod** | Latest | Schema validation |
| **Axios** | Latest | HTTP client |
| **Lucide React** | Latest | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 24.x | Runtime environment |
| **Express** | 5.x | Web framework |
| **Prisma** | 6.x | ORM & Database toolkit |
| **MongoDB** | Latest | NoSQL database |
| **CORS** | Latest | Cross-origin resource sharing |
| **Dotenv** | Latest | Environment variables |

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER                            │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                    React Application                          │ │
│  │                                                               │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │ │
│  │  │   UI Layer   │  │  State Mgmt  │  │   Validation     │   │ │
│  │  │ (Components) │  │ TanStack Q   │  │   (Zod)          │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │ │
│  │           ↓                 ↓                   ↓            │ │
│  │  ┌─────────────────────────────────────────────────────┐    │ │
│  │  │            API Communication Layer                   │    │ │
│  │  │              (Axios Client)                          │    │ │
│  │  └─────────────────────────────────────────────────────┘    │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                   ↓ HTTP/REST
                                   ↓ (JSON)
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVER                              │
│                     (Node.js + Express)                             │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                      API Routes                               │ │
│  │                                                               │ │
│  │  ┌──────────────┐         ┌──────────────┐                  │ │
│  │  │   /events    │         │  /attendees  │                  │ │
│  │  │  - GET       │         │  - GET       │                  │ │
│  │  │  - POST      │         │  - POST      │                  │ │
│  │  │  - PUT       │         │  - PUT       │                  │ │
│  │  │  - DELETE    │         │  - DELETE    │                  │ │
│  │  └──────────────┘         └──────────────┘                  │ │
│  │           ↓                         ↓                        │ │
│  │  ┌─────────────────────────────────────────────────────┐    │ │
│  │  │              Prisma ORM Layer                        │    │ │
│  │  │         (Database Abstraction)                       │    │ │
│  │  └─────────────────────────────────────────────────────┘    │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                   ↓
                                   ↓ Prisma Queries
┌─────────────────────────────────────────────────────────────────────┐
│                        MongoDB Database                             │
│                                                                     │
│  ┌──────────────────┐              ┌──────────────────┐           │
│  │  Events          │              │   Attendees      │           │
│  │  Collection      │              │   Collection     │           │
│  │                  │              │                  │           │
│  │  - id            │──────1:N────▶│  - id            │           │
│  │  - title         │              │  - name          │           │
│  │  - description   │              │  - email         │           │
│  │  - location      │              │  - eventId       │           │
│  │  - date          │              │  - createdAt     │           │
│  │  - capacity      │              │  - updatedAt     │           │
│  │  - createdAt     │              │                  │           │
│  │  - updatedAt     │              │                  │           │
│  └──────────────────┘              └──────────────────┘           │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

**1. Create Event Flow:**
```
User Input → React Hook Form → Zod Validation → Axios POST → 
Express Route → Prisma Create → MongoDB Insert → Response → 
TanStack Query Update → UI Refresh (Optimistic)
```

**2. Optimistic Update Pattern:**
```
User Action → Optimistic UI Update → API Call → 
[Success: Keep Update] OR [Error: Rollback + Toast]
```

---

## 📁 Project Structure

```
frontend/
├── public/                          # Static assets
├── src/
│   ├── api/                         # API Communication Layer
│   │   ├── client.js                # Axios instance (baseURL: http://localhost:5000)
│   │   ├── events.js                # Event CRUD operations
│   │   └── attendees.js             # Attendee CRUD operations
│   │
│   ├── components/                  # React Components
│   │   ├── ui/                      # Shadcn/UI Components
│   │   │   ├── button.jsx           # Button component
│   │   │   ├── card.jsx             # Card component
│   │   │   ├── dialog.jsx           # Modal dialog
│   │   │   ├── input.jsx            # Input field
│   │   │   ├── label.jsx            # Form label
│   │   │   ├── skeleton.jsx         # Loading skeleton
│   │   │   ├── table.jsx            # Table component
│   │   │   ├── textarea.jsx         # Textarea field
│   │   │   ├── toast.jsx            # Toast notification
│   │   │   └── toaster.jsx          # Toast container
│   │   │
│   │   ├── EventDashboard.jsx       # Main dashboard container
│   │   ├── EventList.jsx            # Event cards list
│   │   ├── EventForm.jsx            # Create/Edit event modal
│   │   ├── AttendeeList.jsx         # Attendee table
│   │   └── AttendeeForm.jsx         # Add/Edit attendee modal
│   │
│   ├── pages/                       # Page Components
│   │   └── EventsPage.jsx           # Main events page
│   │
│   ├── schemas/                     # Zod Validation Schemas
│   │   ├── eventSchema.js           # Event validation rules
│   │   └── attendeeSchema.js        # Attendee validation rules
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   └── use-toast.js             # Toast notification hook
│   │
│   ├── lib/                         # Utility Functions
│   │   ├── queryClient.js           # TanStack Query configuration
│   │   └── utils.js                 # Helper functions (cn, etc.)
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Application entry point
│   ├── index.css                    # Global styles
│   └── App.css                      # Component styles
│
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # TailwindCSS configuration
├── postcss.config.js                # PostCSS configuration
├── components.json                  # Shadcn/UI configuration
├── eslint.config.js                 # ESLint configuration
└── package.json                     # Dependencies & scripts

backend/
├── prisma/
│   └── schema.prisma                # Database schema
├── routes/
│   ├── events.js                    # Event API routes
│   └── attendees.js                 # Attendee API routes
├── prismaClient.js                  # Prisma client instance
├── index.js                         # Express server entry
├── .env                             # Environment variables
└── package.json                     # Dependencies & scripts
```

---

## ✨ Key Features

### 🎯 Core Features
- ✅ **Event Management**: Create, read, update, delete events
- ✅ **Attendee Management**: Register, edit, remove attendees
- ✅ **Capacity Control**: Prevent overbooking with automatic validation
- ✅ **Cascade Delete**: Removing event deletes all attendees

### 🚀 Advanced Features
- ✅ **Optimistic UI Updates**: Instant feedback on all actions
- ✅ **Smart Rollback**: Auto-revert on API failures
- ✅ **Form Validation**: Client-side validation with Zod
- ✅ **Toast Notifications**: Success/error feedback with color coding
- ✅ **Loading States**: Skeleton loaders & spinner states
- ✅ **Empty States**: Beautiful placeholders for empty data
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Confirmation Dialogs**: Beautiful modals for destructive actions

### 🎨 UI/UX Features
- ✅ **Gradient Design**: Modern gradient backgrounds
- ✅ **Hover Effects**: Interactive shadows & transitions
- ✅ **Grid Layout**: Responsive card-based layout
- ✅ **Icon System**: Lucide icons throughout
- ✅ **Color-Coded Toasts**: Green for success, red for errors
- ✅ **Animated Transitions**: Smooth state changes

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create `.env` file in backend folder:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/event-management?retryWrites=true&w=majority"
PORT=5000
NODE_ENV=development
```

4. **Generate Prisma client:**
```bash
npx prisma generate
```

5. **Push schema to MongoDB:**
```bash
npx prisma db push
```

6. **Start backend server:**
```bash
npm run dev
```

Backend should now be running on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend should now be running on `http://localhost:5173`

---

## 🗄️ Database Schema

### Event Model
```prisma
model Event {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  location    String
  date        DateTime
  capacity    Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  attendees   Attendee[]
}
```

### Attendee Model
```prisma
model Attendee {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String
  eventId   String   @db.ObjectId
  event     Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([eventId])
}
```

---

## 🌐 API Endpoints

### Events API (`/api/events`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/events` | Get all events with attendees | - |
| GET | `/api/events/:id` | Get event by ID with attendees | - |
| POST | `/api/events` | Create new event | `{ title, description, location, date, capacity }` |
| PUT | `/api/events/:id` | Update event | `{ title, description, location, date, capacity }` |
| DELETE | `/api/events/:id` | Delete event & attendees | - |

### Attendees API (`/api/attendees`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/attendees/:eventId` | Get attendees for event | - |
| POST | `/api/attendees` | Add attendee to event | `{ name, email, eventId }` |
| PUT | `/api/attendees/:id` | Update attendee | `{ name, email }` |
| DELETE | `/api/attendees/:id` | Remove attendee | - |

---

## 📝 Validation Rules

### Event Validation
```javascript
{
  title: string (min 3 characters)
  description: string (min 5 characters)
  location: string (required)
  date: string (required, valid date)
  capacity: number (positive integer)
}
```

### Attendee Validation
```javascript
{
  name: string (required)
  email: string (valid email format)
}
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (600-700)
- **Secondary**: Indigo (500-600)
- **Success**: Green (500)
- **Error**: Red (500-600)
- **Background**: Gradient (Slate 50 → Blue 50 → Indigo 50)
- **Header**: Black gradient (Gray 900 → Black)

### Typography
- **Headers**: Bold, gradient text
- **Body**: Regular, muted foreground
- **Icons**: Lucide React icons

---

## 🚦 State Management Strategy

### TanStack Query Configuration
```javascript
{
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000  // 5 minutes
  }
}
```

### Optimistic Update Pattern
1. **onMutate**: Cancel queries, snapshot current state, update optimistically
2. **onError**: Rollback to snapshot, show error toast
3. **onSuccess**: Invalidate queries, show success toast
4. **onSettled**: Always invalidate queries for consistency

---

## 📸 User Interface

### Main Dashboard
- Gradient header with logo and tagline
- "Create Event" button (top-right)
- Grid of event cards (responsive: 1-3 columns)

### Event Card
- Title, description, location, date
- Capacity badge showing "X spots left"
- Edit & Delete buttons
- Expandable attendee section

### Modals
- Create/Edit Event form
- Add/Edit Attendee form
- Delete confirmation dialog with warning icon

### Toast Notifications
- **Success**: White background, green border
- **Error**: White background, red border
- Auto-dismiss after timeout

---

## 🔐 Best Practices Implemented

### Frontend
✅ Component composition & reusability  
✅ Custom hooks for logic extraction  
✅ Optimistic UI for better UX  
✅ Error boundaries & fallbacks  
✅ Form validation before submission  
✅ Loading & empty states  
✅ Responsive design patterns  

### Backend
✅ RESTful API design  
✅ Error handling middleware  
✅ CORS configuration  
✅ Environment variables  
✅ Database indexing  
✅ Cascade delete relationships  

### Code Quality
✅ ESLint configuration  
✅ Consistent naming conventions  
✅ Component-level documentation  
✅ Separation of concerns  

---

## 🐛 Troubleshooting

### Backend Won't Start
- Check MongoDB connection string in `.env`
- Ensure Prisma client is generated: `npx prisma generate`
- Verify port 5000 is not in use

### Frontend Can't Connect
- Ensure backend is running on `http://localhost:5000`
- Check `src/api/client.js` baseURL configuration
- Verify CORS is enabled in backend

### Prisma Errors
- Regenerate client: `npx prisma generate`
- Reset database: `npx prisma db push --force-reset`
- Check schema syntax in `prisma/schema.prisma`

---

## 🚀 Future Enhancements

- [ ] User authentication & authorization
- [ ] Event search & filtering
- [ ] Email notifications for attendees
- [ ] Event categories & tags
- [ ] Calendar view integration
- [ ] Export attendees to CSV
- [ ] Event dashboard analytics
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Real-time updates with WebSockets

---
## 👨‍💻 Developer

Built with ❤️ by **Mohd. Altamash Rizwi**

---

## 🙏 Acknowledgments

- **Shadcn/UI** for beautiful components
- **TanStack Query** for powerful state management
- **Prisma** for excellent ORM experience
- **Vite** for blazing fast development

---

**Made with React, Node.js, and lots of ☕**
#
