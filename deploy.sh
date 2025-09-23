#!/bin/bash

# Nexus Platform Deployment Script
echo "🚀 Deploying Nexus Regulatory Intelligence Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your Supabase credentials before deploying."
    echo "Required variables:"
    echo "  - SUPABASE_URL"
    echo "  - SUPABASE_ANON_KEY"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    read -p "Press Enter to continue after setting up .env file..."
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "🌐 Vercel CLI found. Deploying to Vercel..."
    
    # Deploy to Vercel
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment to Vercel successful!"
        echo "Your Nexus platform is now live!"
    else
        echo "❌ Vercel deployment failed."
    fi
else
    echo "📋 Vercel CLI not found. Manual deployment options:"
    echo ""
    echo "Option 1 - Deploy to Vercel:"
    echo "  1. Install Vercel CLI: npm install -g vercel"
    echo "  2. Run: vercel login"
    echo "  3. Run: vercel --prod"
    echo ""
    echo "Option 2 - Deploy to Netlify:"
    echo "  1. Install Netlify CLI: npm install -g netlify-cli"
    echo "  2. Run: netlify login"
    echo "  3. Run: netlify deploy --prod"
    echo ""
    echo "Option 3 - Manual deployment:"
    echo "  1. Upload the 'dist' folder to your hosting provider"
    echo "  2. Set environment variables on your hosting platform"
    echo "  3. Configure build command: npm run build"
    echo ""
fi

echo "🎯 Deployment complete! Your Nexus MVP is ready for stakeholder demos."