Aspirant, [15-12-2024 03:50 PM]
Here is a detailed and well-structured prompt for your AI-generated frontend development request. It clearly describes the application, user flows, and design requirements, ensuring that the AI can create relevant pages and components:

---

### Prompt for AI:

Task: Build a responsive, modern frontend using React, Next.js, Material-UI, and TailwindCSS. The app is for two user roles: students and teachers, with slight variations in their interfaces. The backend with APIs is ready. Follow the structure and component requirements detailed below. Use engaging and visually appealing designs with eye-catching landing pages and seamless navigation.

---

### General Design Requirements:
1. Responsive Design: Ensure the UI works well on all screen sizes (mobile, tablet, desktop).  
2. Theming: Use Material-UI theming, integrated with TailwindCSS for custom styling.  
3. Animations: Add subtle animations for buttons, transitions, and page changes for a modern feel.  
4. Accessibility: Ensure components are accessible (e.g., proper ARIA roles, keyboard navigation).  
5. Spline/3D Elements: Add placeholders for integrating Spline or other 3D assets for enhancing visual appeal.  

---

### Landing Page:
- Navbar:
  - Links: Home, About, Contact Us, Login/Signup.
  - Include a sticky header with smooth scrolling for navigation.
- Main Section:
  - Eye-catching hero section with a bold tagline and "Get Started" button.
  - Use 3D/interactive components (placeholders for future integration).
  - Button navigates to the Sign-Up/Login Page.

---

### Sign-Up/Login Page:
- Separate forms for students and teachers (selected via a role toggle).  
- Fields:
  - Username, Email, Password.
- Buttons:
  - Sign Up, Login.
- Validation for all fields with proper error handling.  

---

### Student Interface:

Home Page (After Login):  
- Main Layout:
  - Sidebar Navigation: Links to:
    - Home.
    - Profile.
    - Settings.
    - Quiz.
    - Play & Fun.
    - Logout.
  - Main Content Area:
    - List all available courses (fetched via API).
    - Display enrolled courses (fetched via API).
- Include hover effects and badges for enrolled courses.

Profile Page:  
- Components:
  - User avatar, username, email.
  - List of enrolled courses.
  - "Edit Profile" button.

Settings Page:  
- Components for:
  - Change username, email, and password.
  - Input validation and feedback.

Quiz Page:  
- Display ongoing quizzes as a list of buttons.  
- Buttons lead to individual quiz pages.  

Play & Fun Page:  
- Creative & Interactive: Add placeholders for games, jokes, or fun activities. No backend integration required.  

---

### Teacher Interface:

Home Page (After Login):  
- Main Layout:
  - Sidebar Navigation: Links to:
    - Home.
    - Add Course.
    - Update Course.
    - Profile.
    - Logout.
  - Main Content Area:
    - Display created courses (fetched via API).
    - Number of students enrolled in each course.
    - Ratings & reviews section for courses.

Add Course Page:  
- A form with fields for:
  - Course title, description, content, and duration.
- Include a file upload component for course materials.

Update Course Page:  
- Display a list of created courses.
- On selecting a course, navigate to:
  - A dedicated form to update course details.

Enrolled Students Page:  
- Display a table with:
  - Student names, emails, and enrollment date.
- Include a search bar for filtering students.

Settings Page:  
- Same functionality as the student's settings page.

---

### Reusable Components:
1. Navbar: Dynamic for role-based navigation.
2. Sidebar: Conditionally renders links based on the user's role.  
3. Card Component: For courses, quizzes, and other items.  
4. Forms: Modular forms for login, signup, and course creation/update.  
5. Table Component: For displaying data (e.g., enrolled students).  

---

Aspirant, [15-12-2024 03:50 PM]
### Additional Features:
- Logout Functionality: A logout button available in the sidebar. On logout, clear the session and redirect to the landing page.  
- API Integration: Prepare placeholders for API calls (fetching courses, quizzes, user data, etc.).  
- Design Enhancements: Use gradient backgrounds, subtle shadows, and Material-UI components for a polished look.  

---

### Deliverables:
1. Fully responsive pages for both roles: students and teachers.  
2. Dynamic routing for navigation.  
3. Reusable and modular components.  
4. Placeholder areas for animations and 3D components.  
5. Smooth transitions between pages.  

--- 

This prompt ensures clarity while offering flexibility for creative UI/UX design. It sets a strong foundation for the AI to generate efficient and visually appealing frontend pages and components.