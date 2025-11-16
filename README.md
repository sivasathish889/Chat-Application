# Real-Time Chat Application

A full-stack real-time chat application built with Next.js, Socket.IO, MongoDB, and Redux Toolkit. Features include user authentication, real-time messaging, contact management, and friend invitations.

## Features

- **User Authentication**: Sign up, login, and OTP verification via email
- **Real-Time Messaging**: Instant message delivery using Socket.IO
- **Contact Management**: Add friends, send/accept/reject invitations
- **User Search**: Find and connect with other users
- **Profile Management**: Customize avatar, status, and about information
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling

## Tech Stack

### Frontend (Next.js App)
- **Framework**: Next.js 15.1.8 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Real-Time**: Socket.IO Client
- **UI Components**: React Icons, React Modal, Emoji Picker
- **HTTP Client**: Axios
- **Notifications**: Sonner

### Backend (Socket Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Real-Time**: Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer

## Project Structure

```
Chat Application/
├── chat-application/          # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       # Authentication pages
│   │   │   ├── api/          # API routes
│   │   │   ├── components/   # React components
│   │   │   ├── context/      # Socket context
│   │   │   ├── redux/        # Redux store & slices
│   │   │   └── types/        # TypeScript types
│   │   └── middleware.tsx    # Route protection
│   ├── public/               # Static assets
│   └── package.json
│
└── socket-server/            # Socket.IO server
    ├── server.js             # Main server file
    ├── ConservationModel.js  # Message model
    ├── db.js                 # Database connection
    └── package.json
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Chat Application"
```

### 2. Setup Frontend

```bash
cd chat-application
npm install
```

Create `.env` file in `chat-application/`:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET_KEY=your_jwt_secret_key
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 3. Setup Socket Server

```bash
cd ../socket-server
npm install
```

Create `.env` file in `socket-server/`:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET_KEY=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
SERVER_URL=localhost
PORT=3001
```

## Running the Application

### Start MongoDB

Ensure MongoDB is running on your system.

### Start Socket Server

```bash
cd socket-server
npm run dev
```

Server runs on `http://localhost:3001`

### Start Frontend

```bash
cd chat-application
npm run dev
```

Application runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/sign-up` - User registration
- `POST /api/login` - User login
- `POST /api/verifyOtp` - OTP verification
- `POST /api/logout` - User logout

### User Management
- `GET /api/currentUser` - Get current user details
- `GET /api/searchUser` - Search users by username/email
- `GET /api/getContacts` - Get user's contact list

### Invitations
- `POST /api/inviteUser` - Send friend invitation
- `POST /api/inviteAccept` - Accept friend invitation
- `POST /api/inviteReject` - Reject friend invitation
- `GET /api/getInvitedUser` - Get pending invitations

### Messaging
- `GET /api/getChatListByUser` - Get chat list
- `GET /api/getUserChat` - Get conversation with specific user

## Socket Events

### Client → Server
- `message` - Send a message

### Server → Client
- `sender` - Confirmation of sent message
- `recievedMsg` - Receive message from another user

## Database Models

### User Model
```typescript
{
  username: String,
  email: String,
  avatar: String,
  status: "Online" | "Offline",
  about: String,
  password: String,
  phone: Number,
  friend: [{
    inviter_user: ObjectId,
    status: 0 | 1 | 2  // 0: noInvite, 1: pending, 2: accept
  }],
  timestamps: true
}
```

### Conversation Model
```typescript
{
  senderId: ObjectId,
  receiverId: ObjectId,
  message: String,
  status: Boolean,
  timestamps: true
}
```

## Redux Store Structure

- `user` - Current user information
- `expandNav` - Navigation bar state
- `setMsgStoreInChat` - Message storage
- `chatToContactToggleSLice` - Toggle between chat and contacts
- `currentChatUser` - Active chat user
- `setContactToChat` - Contact to chat transition

## Key Features Implementation

### Authentication Flow
1. User signs up with email, username, password, and phone
2. OTP sent to email for verification
3. After verification, user can login
4. JWT token stored in HTTP-only cookie

### Real-Time Messaging
1. Socket connection established on login
2. Messages sent via Socket.IO events
3. Messages stored in MongoDB
4. Real-time delivery to online users

### Friend System
- Send invitation (status: 1 - pending)
- Accept invitation (status: 2 - accepted)
- Reject invitation (removes invitation)

## Middleware

Route protection implemented in `middleware.tsx`:
- Public routes: `/login`, `/sign-up`
- Protected routes: `/` (home/chat)
- Automatic redirection based on authentication status

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom Colors**: 
  - Primary: `#D6A8A8`
  - Secondary: `#DB8C8C`
- Responsive design with mobile-first approach

## Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Socket Server
```bash
npm run dev      # Start with nodemon
```

## Environment Variables

### Required for Frontend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET_KEY` - Secret key for JWT
- `EMAIL_USER` - Email for sending OTPs
- `EMAIL_PASS` - Email app password

### Required for Socket Server
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET_KEY` - Secret key for JWT
- `CLIENT_URL` - Frontend URL
- `SERVER_URL` - Server hostname
- `PORT` - Server port (default: 3001)

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- HTTP-only cookies
- CORS configuration
- Route protection middleware
- OTP verification for registration

## Future Enhancements

- [ ] Group chat functionality
- [ ] File/image sharing
- [ ] Voice/video calls
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] Message reactions
- [ ] User blocking
- [ ] Message search
- [ ] Dark mode
- [ ] Push notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please open an issue in the repository.

---

**Note**: Make sure to replace placeholder values in `.env` files with your actual credentials before running the application.
