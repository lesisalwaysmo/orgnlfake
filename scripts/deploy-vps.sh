#!/bin/bash
set -e

# ============================================================
#  ORGNLFAKE.AGENCY — Hostinger VPS Deployment Script
#  Run this on your VPS as root:
#    ssh root@<VPS_IP>
#    bash deploy-vps.sh
# ============================================================

DOMAIN="orgnlfake.agency"
REPO="https://github.com/lesisalwaysmo/orgnlfake.git"
APP_DIR="/var/www/orgnlfake"
NODE_VERSION="20"

echo ""
echo "========================================"
echo "  Deploying $DOMAIN"
echo "========================================"
echo ""

# ----- Step 1: System update -----
echo "▶ [1/7] Updating system packages..."
apt update && apt upgrade -y

# ----- Step 2: Install Node.js -----
echo "▶ [2/7] Installing Node.js $NODE_VERSION..."
if command -v node &> /dev/null; then
    echo "  Node.js already installed: $(node -v)"
else
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt install -y nodejs
    echo "  Installed Node.js $(node -v)"
fi

# ----- Step 3: Install PM2 -----
echo "▶ [3/7] Installing PM2..."
if command -v pm2 &> /dev/null; then
    echo "  PM2 already installed"
else
    npm install -g pm2
fi

# ----- Step 4: Install Nginx & Git -----
echo "▶ [4/7] Installing Nginx, Certbot & Git..."
apt install -y nginx certbot python3-certbot-nginx git
systemctl enable nginx
systemctl start nginx

# ----- Step 5: Clone & Build -----
echo "▶ [5/7] Cloning repo & building app..."
if [ -d "$APP_DIR" ]; then
    echo "  Directory exists, pulling latest..."
    cd "$APP_DIR"
    git pull
else
    mkdir -p /var/www
    git clone "$REPO" "$APP_DIR"
    cd "$APP_DIR"
fi

npm ci

# Create production .env.local
cat > .env.local << 'ENVEOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xyhbmaetyufjbqrcrspe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5aGJtYWV0eXVmamJxcmNyc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTgxMjYsImV4cCI6MjA4NTY3NDEyNn0.zYEcU4xxh5R1Y0SN42fE_LDgmdHDCZ2HezMM7m4rVrU

# Site URL (production)
NEXT_PUBLIC_SITE_URL=https://orgnlfake.agency
ENVEOF

echo "  Building Next.js for production..."
npm run build

# ----- Step 6: Start with PM2 -----
echo "▶ [6/7] Starting app with PM2..."
pm2 delete flowing-app 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# Verify app is running
sleep 3
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "  ✅ App is running on port 3000"
else
    echo "  ⚠️  App may still be starting... check with: pm2 logs flowing-app"
fi

# ----- Step 7: Configure Nginx -----
echo "▶ [7/7] Configuring Nginx reverse proxy..."

cat > /etc/nginx/sites-available/$DOMAIN << NGINXEOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Increase timeouts for large pages
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        access_log off;
    }
}
NGINXEOF

# Enable site, remove default site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test & reload
nginx -t && systemctl reload nginx

echo ""
echo "========================================"
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "========================================"
echo ""
echo "  Your app is now running at:"
echo "    http://$DOMAIN"
echo ""
echo "  Next steps:"
echo "  1. Make sure DNS A records for '$DOMAIN' and 'www.$DOMAIN'"
echo "     point to this server's IP address."
echo ""
echo "  2. Once DNS has propagated, enable HTTPS by running:"
echo "     certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "  3. Test auto-renewal:"
echo "     certbot renew --dry-run"
echo ""
echo "  To update the app in the future, run:"
echo "     cd $APP_DIR && git pull && npm ci && npm run build && pm2 restart flowing-app"
echo ""
