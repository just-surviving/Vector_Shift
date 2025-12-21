# 🚀 Deployment Guide

## Frontend Deployment (Netlify)

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub first**:
   ```bash
   # Run the git setup script
   .\setup_git.ps1
   
   # Push to GitHub
   git push -u origin master --force
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `Vector_Shift` repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy site"

### Option 2: Manual Deploy

1. **Build the project**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `frontend/build` folder
   - Your site will be live instantly!

---

## Backend Deployment (Render - Free)

### Option 1: GitHub Integration

1. **Push backend to GitHub** (already done with setup script)

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `Vector_Shift` repository
   - Configure:
     - **Name**: `vectorshift-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Click "Create Web Service"

### Option 2: Railway (Alternative)

1. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select `Vector_Shift` repository
   - Railway will auto-detect Python and deploy

---

## Environment Configuration

### Update Frontend Environment

Once your backend is deployed, update the production API URL:

1. **Get your backend URL** from Render (e.g., `https://vectorshift-backend.onrender.com`)

2. **Update `.env.production`**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

3. **Redeploy frontend** on Netlify (it will auto-redeploy if connected to GitHub)

---

## Custom Domain (Optional)

### Netlify Custom Domain
1. Go to your Netlify site dashboard
2. Click "Domain settings"
3. Add your custom domain
4. Follow DNS configuration instructions

### Example URLs
- **Frontend**: `https://vectorshift-pipeline.netlify.app`
- **Backend**: `https://vectorshift-backend.onrender.com`

---

## Testing Deployment

1. **Test Frontend**: Visit your Netlify URL
2. **Test Backend**: Visit `https://your-backend-url.onrender.com`
3. **Test Integration**: Create a pipeline and click "Submit Pipeline"

---

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS includes your Netlify domain
   - Check `backend/main.py` CORS configuration

2. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in `package.json`

3. **Backend Not Responding**:
   - Render free tier sleeps after 15 minutes
   - First request may take 30+ seconds to wake up
   - Consider upgrading to paid tier for production

4. **Environment Variables**:
   - Ensure `.env.production` has correct backend URL
   - Netlify will use production environment automatically

---

## Performance Tips

1. **Enable Netlify Analytics** for usage insights
2. **Use Netlify Edge Functions** for advanced features
3. **Enable Render Auto-Deploy** for continuous deployment
4. **Monitor Render logs** for backend issues

---

## Cost Breakdown

- **Netlify**: Free (100GB bandwidth, 300 build minutes)
- **Render**: Free (750 hours/month, sleeps after 15min inactivity)
- **Total**: $0/month for hobby projects

For production, consider:
- **Netlify Pro**: $19/month
- **Render Starter**: $7/month (no sleep)