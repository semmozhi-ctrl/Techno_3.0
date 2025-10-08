# 🚀 Tech Event Website - Ideathon & Vibe Coding

A modern, responsive website for hosting tech events with submission tracking and result publishing.

## 📋 Features

- ✨ **Modern Glassmorphism UI** with animated gradients
- ⏱️ **Live Countdown Timer** to submission deadline
- 📝 **Google Form Integration** for project submissions
- 🏆 **Dynamic Results Display** from JSON data
- 📱 **Fully Responsive** design for all devices
- 🎨 **Smooth Animations** and scroll effects

---

## 🎯 Quick Start

1. **Open `index.html`** in your browser
2. **Update the deadline** in `script.js`
3. **Add your Google Form links** in `index.html`
4. **Manage results** through `data.json`

---

## ⚙️ Configuration Guide

### 1️⃣ **Setting the Submission Deadline**

Open `script.js` and modify line 3:

```javascript
const DEADLINE = new Date('2025-10-15T23:59:59').getTime();
```

**Format:** `'YYYY-MM-DDTHH:MM:SS'`

**Examples:**
```javascript
// For October 15, 2025 at 11:59 PM
const DEADLINE = new Date('2025-10-15T23:59:59').getTime();

// For November 1, 2025 at 6:00 PM
const DEADLINE = new Date('2025-11-01T18:00:00').getTime();

// To show results immediately (use a past date)
const DEADLINE = new Date('2025-10-01T23:59:59').getTime();
```

**Behavior:**
- **Before deadline:** Shows countdown timer and accepts submissions
- **After deadline:** Countdown shows "00:00:00" and results are displayed automatically

---

### 2️⃣ **Adding Google Form Links**

Open `index.html` and find the submission buttons (around line 149):

```html
<a href="https://forms.google.com/your-form-link-here" target="_blank" class="submit-button ideathon-btn">
    Submit Ideathon Project
</a>
<a href="https://forms.google.com/your-form-link-here" target="_blank" class="submit-button vibe-btn">
    Submit Vibe Coding Project
</a>
```

Replace `https://forms.google.com/your-form-link-here` with your actual Google Form URLs.

**Example:**
```html
<a href="https://forms.google.com/d/e/1FAIpQLSc.../viewform" target="_blank" class="submit-button ideathon-btn">
    Submit Ideathon Project
</a>
```

---

## 📊 Managing Results with `data.json`

### File Structure

```json
{
  "resultsPublished": true,
  "lastUpdated": "2025-10-08T12:00:00Z",
  "participants": [
    {
      "projectName": "Project Title",
      "category": "Ideathon",
      "teamName": "Team Name",
      "members": ["Member 1", "Member 2", "Member 3"],
      "github": "https://github.com/username/repo",
      "deployLink": "https://example.netlify.app"
    }
  ]
}
```

---

### 🔑 JSON Fields Explanation

#### **Top Level:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `resultsPublished` | boolean | ✅ Yes | Set to `true` to show results, `false` to hide them |
| `lastUpdated` | string | ❌ No | ISO timestamp of last update (for reference) |
| `participants` | array | ✅ Yes | Array of participant objects |

#### **Participant Object:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `projectName` | string | ✅ Yes | Name of the project | `"AI Healthcare Assistant"` |
| `category` | string | ✅ Yes | Event category | `"Ideathon"` or `"Vibe Coding"` |
| `teamName` | string | ✅ Yes | Name of the team | `"Code Warriors"` |
| `members` | array | ✅ Yes | Array of team member names | `["John", "Jane", "Mike"]` |
| `github` | string | ❌ No | GitHub repository URL | `"https://github.com/..."` |
| `deployLink` | string | ❌ No | Live deployment URL | `"https://app.vercel.app"` |

---

### 📝 Usage Examples

#### **Example 1: Show Results Immediately**

```json
{
  "resultsPublished": true,
  "participants": [
    {
      "projectName": "Smart Traffic System",
      "category": "Vibe Coding",
      "teamName": "Tech Innovators",
      "members": ["Alice", "Bob"],
      "github": "https://github.com/alice/traffic-system",
      "deployLink": "https://traffic-system.vercel.app"
    }
  ]
}
```

#### **Example 2: Hide Results (Results Being Evaluated)**

```json
{
  "resultsPublished": false,
  "participants": []
}
```

**Result:** Shows "⏳ Results are being evaluated... Check back in a few hours!"

#### **Example 3: Project Without Deploy Link**

```json
{
  "projectName": "Blockchain Voting",
  "category": "Ideathon",
  "teamName": "Chain Creators",
  "members": ["Oliver", "Sophia"],
  "github": "https://github.com/oliver/blockchain-vote",
  "deployLink": ""
}
```

**Note:** Leave `deployLink` as empty string `""` if no deployment available.

#### **Example 4: Multiple Participants**

```json
{
  "resultsPublished": true,
  "lastUpdated": "2025-10-08T15:30:00Z",
  "participants": [
    {
      "projectName": "EcoShop Platform",
      "category": "Ideathon",
      "teamName": "Green Coders",
      "members": ["Sarah", "Tom", "Emily"],
      "github": "https://github.com/sarah/ecoshop",
      "deployLink": "https://ecoshop.netlify.app"
    },
    {
      "projectName": "AR Education App",
      "category": "Vibe Coding",
      "teamName": "Future Learning",
      "members": ["David", "Emma"],
      "github": "https://github.com/david/ar-education",
      "deployLink": ""
    },
    {
      "projectName": "Real-Time Collab Tool",
      "category": "Vibe Coding",
      "teamName": "Sync Squad",
      "members": ["Chris", "Lisa", "Mark"],
      "github": "https://github.com/chris/collab-tool",
      "deployLink": "https://collab-tool.herokuapp.com"
    }
  ]
}
```

---

## 🎬 Step-by-Step Workflow

### **Phase 1: Before Deadline**
1. Set future deadline in `script.js`
2. Add Google Form links in `index.html`
3. Set `"resultsPublished": false` in `data.json`
4. Website shows countdown timer and submission buttons

### **Phase 2: After Deadline (Evaluation Period)**
- Deadline passes automatically
- Countdown shows "00:00:00"
- Keep `"resultsPublished": false`
- Shows: "⏳ Results are being evaluated..."

### **Phase 3: Publish Results**
1. Add participant details to `data.json`
2. Set `"resultsPublished": true`
3. Results appear automatically on the website!

---

## 🛠️ Common Tasks

### Adding a New Semi-Finalist

1. Open `data.json`
2. Add a new object to the `participants` array:

```json
{
  "projectName": "New Project Name",
  "category": "Ideathon",
  "teamName": "Team Name",
  "members": ["Member 1", "Member 2"],
  "github": "https://github.com/...",
  "deployLink": "https://..."
}
```

3. Save the file - results update automatically!

### Removing a Participant

Simply delete the participant object from the `participants` array in `data.json`.

### Updating Participant Information

Edit the relevant fields in the participant object in `data.json`.

### Clearing All Results

Set the `participants` array to empty:

```json
{
  "resultsPublished": false,
  "participants": []
}
```

---

## 📱 Testing Locally

1. **Open in Browser:**
   - Simply double-click `index.html`
   - Or use Live Server extension in VS Code

2. **Test Countdown:**
   - Set a near-future deadline (5 minutes ahead)
   - Watch the countdown update in real-time

3. **Test Results:**
   - Set a past deadline
   - Set `"resultsPublished": true`
   - Check if results display correctly

---

## 🎨 Customization Tips

### Changing Colors

Edit `style.css` CSS variables (lines 10-20):

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* Modify these for different color schemes */
}
```

### Changing Event Name

Edit `index.html` (line 7 and line 26):

```html
<title>Your Event Name - 2025</title>
```

```html
<span class="gradient-text">YOUR EVENT NAME</span>
```

### Adding Social Media Links

Edit `index.html` footer section (lines 180-184):

```html
<a href="https://twitter.com/yourhandle" class="social-link">Twitter</a>
<a href="https://linkedin.com/company/yourpage" class="social-link">LinkedIn</a>
```

---

## ❗ Troubleshooting

### Problem: Results Not Showing

**Solutions:**
- ✅ Check if deadline has passed (in `script.js`)
- ✅ Verify `"resultsPublished": true` in `data.json`
- ✅ Check browser console for JSON parsing errors (F12)
- ✅ Ensure `data.json` has valid JSON syntax

### Problem: Countdown Not Working

**Solutions:**
- ✅ Check date format in `script.js`: `'YYYY-MM-DDTHH:MM:SS'`
- ✅ Ensure date is valid (no February 30th, etc.)
- ✅ Check browser console for JavaScript errors

### Problem: JSON Syntax Error

**Common mistakes:**
- ❌ Missing comma between objects
- ❌ Trailing comma after last item
- ❌ Unescaped quotes in strings
- ❌ Missing closing brackets

**Use:** [JSONLint.com](https://jsonlint.com/) to validate your JSON

---

## 📂 Project Structure

```
Result_site/
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # JavaScript functionality
├── data.json           # Results data (edit this!)
└── README.md           # This documentation
```

---

## 🚀 Deployment

### Deploy to Netlify:
1. Drag and drop the entire folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get instant live URL!

### Deploy to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project folder
3. Follow prompts

### Deploy to GitHub Pages:
1. Create a new repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site is live!

---

## 💡 Tips & Best Practices

1. **Backup `data.json`** before making changes
2. **Validate JSON** after each edit using JSONLint
3. **Test thoroughly** before publishing results
4. **Set realistic deadlines** with buffer time
5. **Update `lastUpdated`** field for tracking
6. **Use consistent formatting** in participant names
7. **Test on mobile devices** before launch

---

## 📞 Support

- Check browser console (F12) for errors
- Validate JSON syntax at [JSONLint.com](https://jsonlint.com/)
- Review this README for configuration steps

---

## 📄 License

Free to use and modify for your tech events!

---

**Made with ❤️ for Tech Events | 2025**

---

## 🎯 Quick Reference Card

| Action | File | What to Change |
|--------|------|----------------|
| Set deadline | `script.js` | Line 3: `const DEADLINE = ...` |
| Add form links | `index.html` | Lines 149-154: `href="..."` |
| Show/hide results | `data.json` | `"resultsPublished": true/false` |
| Add participants | `data.json` | Add objects to `participants` array |
| Change colors | `style.css` | Lines 10-20: CSS variables |

---

**Remember:** Results automatically appear after the deadline passes AND `resultsPublished` is set to `true`! 🎉
