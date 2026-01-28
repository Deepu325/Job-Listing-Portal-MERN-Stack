# 🧪 Job Listing Portal - Complete Testing Guide

**Project:** Job Listing Portal (MERN Stack)  
**Scope:** Tasks 1-6 (Authentication → Dashboard)  
**Objective:** Zero broken flows, zero hardcoded data, zero role leaks

---

## 🚀 Quick Start

### Prerequisites
- MongoDB running locally on port 27017
- Node.js installed
- Both servers running:
  ```bash
  # Terminal 1 - Backend
  cd server
  npm run dev
  
  # Terminal 2 - Frontend
  cd client
  npm run dev
  ```

### Access Points
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **Database:** mongodb://127.0.0.1:27017/jobportal

---

## 🔐 TASK 1: Authentication & Authorization Testing

### ✅ Registration Flow

#### Test Case 1.1: Register Job Seeker
1. Navigate to `/register`
2. Fill form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+1234567890`
   - Password: `Password123`
   - Role: **Job Seeker**
3. **Expected:** Success message + redirect to `/login`
4. **Verify:** Check MongoDB `users` collection for new entry

#### Test Case 1.2: Register Employer
1. Navigate to `/register`
2. Fill form:
   - Name: `Jane Smith`
   - Email: `jane@company.com`
   - Phone: `+0987654321`
   - Password: `SecurePass456`
   - Role: **Employer**
3. **Expected:** Success message + redirect to `/login`

#### Test Case 1.3: Duplicate Email Rejection
1. Try registering with `john@example.com` again
2. **Expected:** Error message "Email already registered"

#### Test Case 1.4: Weak Password Rejection
1. Try password: `123`
2. **Expected:** Validation error "Password must be at least 6 characters"

#### Test Case 1.5: Missing Fields
1. Leave email blank
2. **Expected:** Error "Please fill in all required fields"

---

### ✅ Login Flow

#### Test Case 1.6: Valid Login (Job Seeker)
1. Navigate to `/login`
2. Email: `john@example.com`, Password: `Password123`
3. **Expected:** 
   - JWT token stored in localStorage
   - Redirect to `/` (home)
   - Navbar shows profile avatar

#### Test Case 1.7: Valid Login (Employer)
1. Login with `jane@company.com`
2. **Expected:** Same as above + employer-specific UI elements

#### Test Case 1.8: Invalid Credentials
1. Wrong password: `WrongPass`
2. **Expected:** Error "Invalid credentials"

#### Test Case 1.9: Token Persistence
1. Login successfully
2. Refresh page (F5)
3. **Expected:** User remains logged in

#### Test Case 1.10: Logout
1. Click "Logout" in navbar
2. **Expected:** 
   - Token removed from localStorage
   - Redirect to `/login`
   - Protected routes now redirect to login

---

### ✅ Security Edge Cases

#### Test Case 1.11: Access Protected API Without Token
1. Open DevTools → Console
2. Run:
   ```javascript
   fetch('http://localhost:4000/api/v1/profile/jobseeker')
     .then(r => r.json())
     .then(console.log)
   ```
3. **Expected:** `401 Unauthorized` error

#### Test Case 1.12: Role-Based API Access (Employer as Job Seeker)
1. Login as Employer
2. In Console:
   ```javascript
   fetch('http://localhost:4000/api/v1/profile/jobseeker', {
     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
   }).then(r => r.json()).then(console.log)
   ```
3. **Expected:** `403 Forbidden` - "Access denied"

#### Test Case 1.13: Job Seeker Accessing Employer Routes
1. Login as Job Seeker
2. Try POST to `/api/v1/jobs` (create job)
3. **Expected:** `403 Forbidden`

#### Test Case 1.14: Invalid/Expired Token
1. Manually edit token in localStorage to gibberish
2. Try accessing `/profile`
3. **Expected:** Redirect to `/login` with error message

---

## 👤 TASK 2: Profile Management Testing

### ✅ Job Seeker Profile

#### Test Case 2.1: Fetch Profile (No Profile Yet)
1. Login as new Job Seeker
2. Navigate to `/profile`
3. **Expected:** 
   - "Complete Your Profile" empty state
   - Button to create profile

#### Test Case 2.2: Create Profile
1. Click "Create Your Profile"
2. Fill all fields:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+1234567890`
   - Education: `Bachelor's Degree (B.Tech/B.E.)`
   - Skills: Select `React`, `Node.js`, `MongoDB`
   - Experience: `2 years of web development`
3. Upload Resume (PDF)
4. Upload Profile Picture (JPG)
5. **Expected:** Success + redirect to `/profile`

#### Test Case 2.3: View Profile
1. After creation, check `/profile`
2. **Expected:** All data displayed correctly

#### Test Case 2.4: Update Profile
1. Click "Edit Profile"
2. Change education to `Master's Degree (M.Tech/M.E.)`
3. Add skill: `TypeScript`
4. **Expected:** Changes saved and reflected

#### Test Case 2.5: Resume Upload (Invalid Type)
1. Try uploading `.txt` file
2. **Expected:** Error "Only PDF, DOC, and DOCX files are allowed!"

#### Test Case 2.6: Profile Picture (Invalid Type)
1. Try uploading `.pdf` file as picture
2. **Expected:** Error "Only JPEG, PNG, GIF, and WebP images are allowed!"

#### Test Case 2.7: Persistence After Refresh
1. Update profile
2. Refresh page
3. **Expected:** All changes still visible

---

### ✅ Employer Profile

#### Test Case 2.8: Create Employer Profile
1. Login as Employer
2. Navigate to `/create-employer-profile`
3. Fill:
   - Company Name: `TechCorp Inc.`
   - Email: `hr@techcorp.com`
   - Phone: `+1112223333`
   - Location: `San Francisco, CA`
   - Industry: `Technology`
   - Website: `https://techcorp.com`
4. **Expected:** Success + redirect to `/profile`

#### Test Case 2.9: Employer Dashboard Visibility
1. After profile creation
2. **Expected:** 
   - Company info displayed
   - "Employer Dashboard" section visible
   - Stats for jobs posted and applications

---

### ✅ Authorization Checks

#### Test Case 2.10: Job Seeker Cannot Access Employer Profile
1. Login as Job Seeker
2. Try to fetch employer profile via API
3. **Expected:** `403 Forbidden`

#### Test Case 2.11: Employer Cannot Access Job Seeker Profile
1. Login as Employer
2. Try accessing `/api/v1/profile/jobseeker`
3. **Expected:** `403 Forbidden`

---

## 📋 TASK 3: Job Listings Testing

### ✅ Employer Flow

#### Test Case 3.1: Create Job
1. Login as Employer
2. Navigate to `/admin/create-job` or create job section
3. Fill:
   - Title: `Senior React Developer`
   - Description: Detailed job description
   - Location: `Remote`
   - Job Type: `Full-time`
   - Skills: `React, TypeScript, Node.js`
   - Salary Min: `80000`, Max: `120000`, Currency: `USD`
4. **Expected:** 
   - Job created successfully
   - Visible immediately on `/jobs` page
   - Listed in Employer Dashboard

#### Test Case 3.2: Edit Own Job
1. In Employer Dashboard → My Jobs
2. Click "Edit" on created job
3. Change title to `Lead React Developer`
4. **Expected:** Changes saved and reflected everywhere

#### Test Case 3.3: Delete Job
1. In Employer Dashboard
2. Click "Delete" on a job
3. Confirm deletion
4. **Expected:** 
   - Job removed from listings
   - All associated applications also deleted
   - Toast confirmation shown

---

### ✅ Authorization Edge Cases

#### Test Case 3.4: Job Seeker Cannot Create Job
1. Login as Job Seeker
2. Try POST to `/api/v1/jobs`
3. **Expected:** `403 Forbidden`

#### Test Case 3.5: Employer Cannot Edit Another Employer's Job
1. Create job as Employer A
2. Login as Employer B
3. Try to edit Employer A's job
4. **Expected:** `403 Forbidden` or "Not authorized"

---

### ✅ UI Validation

#### Test Case 3.6: Jobs Page - Empty State
1. Fresh database with no jobs
2. Navigate to `/jobs`
3. **Expected:** 
   - "No jobs found" message
   - NO hardcoded/dummy jobs displayed

#### Test Case 3.7: Jobs Page - With Jobs
1. Create 2-3 jobs
2. Visit `/jobs`
3. **Expected:** All jobs displayed with real data

#### Test Case 3.8: Latest Jobs Section
1. Visit home page `/`
2. **Expected:** 
   - Latest 6 jobs displayed
   - All data pulled from backend
   - NO dummy "TechCorp" or placeholder companies

---

## 🔍 TASK 4: Job Search & Filtering

### ✅ Backend-Driven Search

#### Test Case 4.1: Search by Keyword (Title)
1. Navigate to `/jobs`
2. Search: `React`
3. **Expected:** Only jobs with "React" in title/description/skills

#### Test Case 4.2: Filter by Job Type
1. Select filter: `Full-time`
2. **Expected:** Only full-time jobs shown

#### Test Case 4.3: Filter by Location
1. Search location: `Remote`
2. **Expected:** Only remote jobs displayed

#### Test Case 4.4: Combined Filters
1. Search: `Developer`
2. Type: `Full-time`
3. Location: `San Francisco`
4. **Expected:** Jobs matching ALL criteria

#### Test Case 4.5: Empty Query
1. Clear all filters
2. **Expected:** All jobs returned

---

### ✅ Edge Cases

#### Test Case 4.6: No Results
1. Search: `NonExistentJobTitle12345`
2. **Expected:** 
   - "No jobs found" empty state
   - No errors thrown

#### Test Case 4.7: Special Characters
1. Search: `C++`, `C#`, `React.js`
2. **Expected:** Safe handling, no crashes

#### Test Case 4.8: Rapid Typing
1. Type quickly: `javascriptdeveloperfrontend`
2. **Expected:** 
   - No duplicate API calls
   - No race conditions
   - Smooth debounce behavior

---

### ✅ Verification

#### Test Case 4.9: Confirm Frontend Does NOT Filter Locally
1. Open DevTools → Network tab
2. Change filter
3. **Expected:** 
   - New API request to `/api/v1/jobs?keyword=...`
   - NO client-side filtering of existing data

---

## 📨 TASK 5: Job Application Flow

### ✅ Job Seeker Actions

#### Test Case 5.1: View Job Description
1. Login as Job Seeker
2. Click on any job card
3. **Expected:** 
   - Full job details displayed
   - "Apply Now" button visible

#### Test Case 5.2: Apply to Job
1. On job description page
2. Click "Apply Now"
3. **Expected:** 
   - Success toast: "Applied successfully!"
   - Button changes to "Already Applied" (disabled)

#### Test Case 5.3: Apply Again to Same Job
1. Click "Already Applied" button
2. **Expected:** Button remains disabled, no action

#### Test Case 5.4: Persistence After Refresh
1. After applying
2. Refresh the page
3. **Expected:** 
   - "Already Applied" state persists
   - Button still disabled

---

### ✅ Authorization

#### Test Case 5.5: Employer Tries to Apply
1. Login as Employer
2. Navigate to job description
3. **Expected:** 
   - "Apply" button either hidden OR
   - Clicking it returns `403 Forbidden`

#### Test Case 5.6: Unauthenticated User
1. Logout
2. Try to view job description
3. **Expected:** 
   - Can view description
   - "Apply" prompts login or redirects to `/login`

---

### ✅ Data Integrity

#### Test Case 5.7: Application Linked Correctly
1. Apply to a job
2. Check MongoDB `applications` collection
3. **Expected:** 
   - `job` field = correct job `_id`
   - `applicant` field = your user `_id`
   - `status` = `"pending"`

#### Test Case 5.8: Job Deletion Cleanup
1. Create job as Employer
2. Job Seeker applies to it
3. Employer deletes the job
4. **Expected:** 
   - Application is also deleted (cascading)
   - Job Seeker's dashboard shows "Job Deleted" or removes entry

---

## 📊 TASK 6: Dashboard Validation

### ✅ Job Seeker Dashboard

#### Test Case 6.1: No Applications Empty State
1. Login as Job Seeker who hasn't applied anywhere
2. Navigate to `/profile`
3. **Expected:** 
   - "You haven't applied for any jobs yet" message

#### Test Case 6.2: Applied Jobs Listed
1. Apply to 2-3 jobs
2. View dashboard
3. **Expected:** 
   - All applications listed
   - Shows: Job Title, Company, Status, Date
   - All data is LIVE from backend

#### Test Case 6.3: Status Reflection
1. Employer changes status to "Shortlisted"
2. Refresh Job Seeker dashboard
3. **Expected:** Status updated to "SHORTLISTED"

#### Test Case 6.4: Persistence
1. Refresh page multiple times
2. **Expected:** Data remains consistent

---

### ✅ Employer Dashboard

#### Test Case 6.5: No Jobs Empty State
1. Login as new Employer
2. **Expected:** 
   - "You haven't posted any jobs yet"
   - Button to "Post Your First Job"

#### Test Case 6.6: Jobs with Applications
1. Post 2 jobs
2. Have Job Seekers apply
3. **Expected:** 
   - Dashboard shows all jobs
   - "Received Applications" tab shows all candidates
   - Stats are accurate

#### Test Case 6.7: Update Application Status
1. In "Received Applications" tab
2. Change dropdown from "Pending" → "Shortlisted"
3. **Expected:** 
   - Status updates immediately
   - Toast confirmation
   - Badge color changes

#### Test Case 6.8: Status Reflects on Job Seeker Side
1. Update status as Employer
2. Job Seeker refreshes their dashboard
3. **Expected:** New status visible on their end

---

### ✅ Role-Based Rendering

#### Test Case 6.9: Role Isolation (UI)
1. Login as Employer
2. **Expected:** 
   - "Employer Dashboard" visible
   - "Application History" NOT visible

3. Login as Job Seeker
4. **Expected:** 
   - "Application History" visible
   - "Employer Dashboard" NOT visible

#### Test Case 6.10: Role Isolation (API)
1. Job Seeker tries: `GET /api/v1/applications/employer`
2. **Expected:** `403 Forbidden`

3. Employer tries: `GET /api/v1/applications/user`
4. **Expected:** `403 Forbidden`

---

## 🔄 CROSS-MODULE EDGE CASES

### Test Case CM.1: Job Deletion → Application Safety
1. Employer creates job
2. 3 Job Seekers apply
3. Employer deletes job
4. **Expected:** 
   - All 3 applications removed from DB
   - Job Seekers' dashboards update gracefully

### Test Case CM.2: Status Update Propagation
1. Employer updates status to "Accepted"
2. **Expected:** 
   - Employer dashboard shows "ACCEPTED"
   - Job Seeker dashboard shows "ACCEPTED"
   - Both UIs have matching badge colors

### Test Case CM.3: No Role Leakage
1. Check all protected routes
2. **Expected:** 
   - Job Seeker cannot access employer-only routes
   - Employer cannot access job-seeker-only routes
   - 403 errors returned consistently

### Test Case CM.4: ID-Based Logic (Not Name-Based)
1. Create two companies with same name
2. **Expected:** 
   - Jobs distinguished by employer `_id`
   - No data mixing

---

## 🧪 PERFORMANCE & UX SANITY

### Test Case P.1: No Infinite Re-renders
1. Open React DevTools → Profiler
2. Navigate between pages
3. **Expected:** Normal render counts, no loops

### Test Case P.2: No Duplicate API Calls
1. Open DevTools → Network
2. Load dashboard
3. **Expected:** 
   - Each API called only once
   - No redundant requests

### Test Case P.3: Loading Indicators
1. Navigate to any data-fetching page
2. **Expected:** 
   - Spinner/skeleton shown while loading
   - No blank screens

### Test Case P.4: Button Disable During Async
1. Click "Apply Now"
2. **Expected:** 
   - Button disabled immediately
   - Shows "Applying..." state
   - Re-enables after success/failure

### Test Case P.5: No Console Errors
1. Open Console (F12)
2. Navigate entire application
3. **Expected:** 
   - No red errors
   - No unhandled promise rejections

---

## 📂 CODE & STRUCTURE VERIFICATION

### ✅ Backend Structure
- [ ] All backend code in `server/` directory
- [ ] No code in old `backend/` folder
- [ ] Models in `server/models/`
- [ ] Controllers in `server/controllers/`
- [ ] Routes in `server/routes/`
- [ ] Middleware in `server/middleware/`

### ✅ Dummy Data Check
```bash
# Search for any remaining dummy/hardcoded data
grep -ri "dummy" client/src --include="*.jsx" --include="*.js"
grep -ri "TechCorp" client/src --include="*.jsx" --include="*.js"
grep -ri "placeholder" client/src --include="*.jsx" --include="*.js"
```
**Expected:** No results (except placeholder attributes in input fields)

### ✅ Console Logs
- [ ] No `console.log` in client production code
- [ ] Only server startup logs in backend

### ✅ Environment Variables
- [ ] `server/.env` exists with:
  - `PORT=4000`
  - `MONGO_URI=mongodb://127.0.0.1:27017/jobportal`
  - `JWT_SECRET=supersecretkey123`
  - `NODE_ENV=development`
- [ ] `client/.env` has `VITE_API_URL=http://localhost:4000`

---

## ✅ FINAL PRODUCTION READINESS CHECK

### Pre-Deployment Checklist:
- [ ] ✔ All Tasks 1-6 tested end-to-end
- [ ] ✔ Live data only (no mock/dummy data)
- [ ] ✔ Authorization enforced everywhere
- [ ] ✔ APIs tested via browser + Postman
- [ ] ✔ Clean UI and error handling
- [ ] ✔ Stable refresh behavior
- [ ] ✔ No console errors or warnings
- [ ] ✔ Role-based access verified
- [ ] ✔ Cascading deletes work correctly
- [ ] ✔ Search is backend-driven
- [ ] ✔ File uploads validated
- [ ] ✔ Git status clean (no uncommitted critical files)

---

## 🚀 DEPLOYMENT APPROVAL

**Status:** ⏳ Pending Full Manual Testing

**Approval Criteria:**  
Only after ALL tests above pass without exceptions should the project be approved for:
- Production deployment
- Merge to `main` branch
- Client handoff

**Sign-Off:**
- [ ] Authentication: ________
- [ ] Profiles: ________
- [ ] Jobs: ________
- [ ] Search: ________
- [ ] Applications: ________
- [ ] Dashboards: ________
- [ ] Security: ________
- [ ] Performance: ________

---

## 📝 Bug Tracking Template

When you find issues, document them:

```markdown
### Bug #XX: [Brief Title]
**Severity:** Critical / High / Medium / Low
**Component:** Auth / Profile / Jobs / Applications / Dashboard
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected:**
**Actual:**
**Fix Status:** ⏳ Pending / ✅ Fixed
```

---

**Last Updated:** 2026-01-28  
**Tester:** [Your Name]  
**Project Version:** 1.0.0
