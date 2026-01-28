# 🚀 Quick Start Testing Guide

## 📍 Access Points
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:4000
- **MongoDB:** mongodb://127.0.0.1:27017/jobportal

---

## ⚡ Fast Track Testing (15 minutes)

### Step 1: Create Test Users (2 min)
1. **Job Seeker Account:**
   - Email: `john@test.com` / Password: `Test123`
   - Role: Job Seeker

2. **Employer Account:**
   - Email: `jane@test.com` / Password: `Test456`
   - Role: Employer

### Step 2: Set Up Profiles (3 min)
**As Job Seeker (john@test.com):**
- Create profile with skills: React, Node.js, MongoDB
- Upload resume (PDF)

**As Employer (jane@test.com):**
- Company: TechCorp Inc.
- Location: San Francisco
- Industry: Technology

### Step 3: Job Lifecycle (5 min)
**As Employer:**
1. Create job: "Senior React Developer"
2. Fill all fields (Remote, Full-time, $80k-$120k)
3. Verify job appears on `/jobs` page

**As Job Seeker:**
4. View job description
5. Click "Apply Now"
6. Verify button changes to "Already Applied"

### Step 4: Dashboard Testing (3 min)
**Employer Dashboard:**
- Check "Received Applications" shows john's application
- Change status: Pending → Shortlisted

**Job Seeker Dashboard:**
- Refresh page
- Verify status changed to "SHORTLISTED"

### Step 5: Security Check (2 min)
**Test Role Enforcement:**
1. As Job Seeker, try accessing: `http://localhost:4000/api/v1/jobs/employer`
   - **Expected:** 403 Forbidden

2. As Employer, try POST to: `/api/v1/applications/apply/:jobId`
   - **Expected:** 403 Forbidden

---

## 🔑 Critical Test Scenarios

### ✅ Must Pass:
1. **No Dummy Data:** Empty DB = Empty job listings (not hardcoded jobs)
2. **Role Isolation:** Job Seekers can't create jobs, Employers can't apply
3. **Cascading Delete:** Delete job → Applications auto-deleted
4. **Search is Backend:** Network tab shows API call when filtering
5. **Status Sync:** Employer status change = Job Seeker sees update

---

## 🛠️ Useful API Endpoints (Postman)

### Auth
```http
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test123",
  "phone": "+1234567890",
  "role": "Job Seeker"
}
```

### Get All Jobs
```http
GET http://localhost:4000/api/v1/jobs
```

### Search Jobs
```http
GET http://localhost:4000/api/v1/jobs?keyword=react&location=remote&jobType=Full-time
```

### Apply to Job (Protected)
```http
POST http://localhost:4000/api/v1/applications/apply/:jobId
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot connect to MongoDB"
**Fix:** Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Issue 2: "JWT token expired"
**Fix:** Login again to get fresh token

### Issue 3: "403 Forbidden" on valid request
**Fix:** Check user role matches the required role for that API

### Issue 4: Jobs not appearing
**Fix:** 
1. Check Network tab - is API call successful?
2. Verify MongoDB has documents in `jobs` collection
3. Clear browser cache and refresh

---

## 📊 MongoDB Queries (Quick Check)

### Check Users
```javascript
db.users.find().pretty()
```

### Check Jobs
```javascript
db.jobs.find().pretty()
```

### Check Applications
```javascript
db.applications.find().pretty()
```

### Verify Cascading Delete
```javascript
// Before deleting job
db.applications.find({ job: ObjectId("YOUR_JOB_ID") })

// Delete job (via app)

// After - should be empty
db.applications.find({ job: ObjectId("YOUR_JOB_ID") })
```

---

## 🎯 Quick Verification Commands

### No Dummy Data Check
```bash
cd client/src
grep -r "TechCorp" --include="*.jsx" --include="*.js"
# Expected: No results in component files
```

### Console Logs Check
```bash
cd client/src
grep -r "console.log" --include="*.jsx" --include="*.js"
# Expected: Minimal/No results
```

### Backend Structure
```bash
ls -la server/
# Expected: controllers, models, routes, middleware, config
```

---

## ✅ Pre-Merge Checklist

- [ ] All 6 tasks tested manually
- [ ] Both role dashboards working
- [ ] Search returns correct results
- [ ] Applications tracked properly
- [ ] Status updates sync
- [ ] Job deletion cascades
- [ ] No console errors
- [ ] No 500 errors in Network tab
- [ ] All APIs return correct status codes (200, 403, 404, etc.)
- [ ] Loading states work
- [ ] Empty states display correctly

---

## 📖 Full Documentation
- **Comprehensive Testing:** See `TESTING_GUIDE.md`
- **Project Status:** See `PROJECT_STATUS.md`

---

**Ready to test?** Open http://localhost:5173 and start with Step 1! 🚀
