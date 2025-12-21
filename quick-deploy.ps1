# Quick deployment script for VectorShift Pipeline Builder

Write-Host "🚀 VectorShift Pipeline Builder - Quick Deploy" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "frontend/package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Build the frontend
Write-Host "📦 Building frontend..." -ForegroundColor Yellow
cd frontend
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend build successful!" -ForegroundColor Green
cd ..

# Instructions for deployment
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 📤 Deploy Frontend to Netlify:" -ForegroundColor White
Write-Host "   • Go to https://netlify.com" -ForegroundColor Gray
Write-Host "   • Drag & drop the 'frontend/build' folder" -ForegroundColor Gray
Write-Host "   • Or connect to GitHub for auto-deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 🔧 Deploy Backend to Render:" -ForegroundColor White
Write-Host "   • Go to https://render.com" -ForegroundColor Gray
Write-Host "   • Create new Web Service from GitHub" -ForegroundColor Gray
Write-Host "   • Root Directory: backend" -ForegroundColor Gray
Write-Host "   • Build: pip install -r requirements.txt" -ForegroundColor Gray
Write-Host "   • Start: uvicorn main:app --host 0.0.0.0 --port `$PORT" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 🔗 Update API URL:" -ForegroundColor White
Write-Host "   • Copy your Render backend URL" -ForegroundColor Gray
Write-Host "   • Update frontend/.env.production" -ForegroundColor Gray
Write-Host "   • Redeploy frontend" -ForegroundColor Gray
Write-Host ""
Write-Host "📁 Build folder ready: frontend/build" -ForegroundColor Green
Write-Host "📖 Full guide: deploy.md" -ForegroundColor Blue