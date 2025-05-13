# Community Portal Website

Hey! This is our community website project. It shows upcoming events and has info about our team. 
You can see events that are coming up, check out past events, and even send us messages through a contact form.

## 👥 Team Members and Roles

| Name                    | Role                    | Responsibilities                              |
|-------------------------|-------------------------|-----------------------------------------------|
| Bianca Long             | Team Lead               | Project coordination, error handling          |
| Viljoen Steenkamp       | Frontend Developer      | Frontend, EJS templates, CSS styling          |
| Marius Francois Grassman| Backend Developer       | Backend, Routes, form handling                |
| Noah Blaauw             | Data Manager            | Sample data, validation, testing              |


## 🚀 Getting Started

You'll need:
- Node.js
- MongoDB
- Git

Quick setup:
```bash
# Get the code and install stuff
git clone [repository-url]
cd Dynamic-Community_Portal_Website
npm install

# Set up MongoDB connection
echo "MONGO_URI=mongodb://localhost:27017/community_portal" > .env

# Add sample events to database
node scripts/seedDB.js

# Run the website
npm start
```

That's it! Go to http://localhost:3000 to see the site.

## 🔍 What's Inside
- Shows upcoming and past events
- Team member info
- Contact form
- Looks good on phones too

---
*For our WPR381 Project*
