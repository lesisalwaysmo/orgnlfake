-- Migration: Access Requests & Fort Knox Tokens for White-Glove Marketplace
-- Tables: access_requests, access_tokens

-- ============================================
-- ACCESS REQUESTS TABLE
-- Lead capture for restricted content requests
-- ============================================
CREATE TABLE IF NOT EXISTS access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_link TEXT NOT NULL,          -- Social media / website URL
  category TEXT NOT NULL,             -- Restricted category requested
  creator_username TEXT NOT NULL,     -- Which model's content
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'EXPIRED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage all access requests" ON access_requests
  FOR ALL USING (is_admin());

-- Models can view requests for their own portfolio
CREATE POLICY "Models can view own access requests" ON access_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.username = access_requests.creator_username
      AND profiles.status = 'active'
    )
  );

-- Models can update (approve) requests for their own portfolio
CREATE POLICY "Models can update own access requests" ON access_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.username = access_requests.creator_username
      AND profiles.status = 'active'
    )
  );

-- Public can insert new requests (lead capture)
CREATE POLICY "Anyone can submit access requests" ON access_requests
  FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_access_requests_creator ON access_requests(creator_username);
CREATE INDEX idx_access_requests_status ON access_requests(status);

-- Updated_at trigger
CREATE TRIGGER update_access_requests_updated_at
  BEFORE UPDATE ON access_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- ACCESS TOKENS TABLE (Fort Knox Security)
-- Self-destructing, device-locked, view-limited tokens
-- ============================================
CREATE TABLE IF NOT EXISTS access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,           -- Crypto random hex string
  request_id UUID NOT NULL REFERENCES access_requests(id) ON DELETE CASCADE,
  view_count INT DEFAULT 0,             -- Max 2 views allowed
  device_id TEXT,                       -- Browser cookie lock for anti-sharing
  expires_at TIMESTAMPTZ NOT NULL,      -- 24-hour self-destruct
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE access_tokens ENABLE ROW LEVEL SECURITY;

-- Admins can manage all tokens
CREATE POLICY "Admins can manage all access tokens" ON access_tokens
  FOR ALL USING (is_admin());

-- Models can view tokens for their requests
CREATE POLICY "Models can view own access tokens" ON access_tokens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM access_requests ar
      JOIN profiles p ON p.username = ar.creator_username
      WHERE ar.id = access_tokens.request_id
      AND p.id = auth.uid()
      AND p.status = 'active'
    )
  );

-- Public can read token by exact token match (for vault page validation)
CREATE POLICY "Public can validate tokens" ON access_tokens
  FOR SELECT USING (true);

-- Public can update token (increment view_count, set device_id) — needed for vault page
CREATE POLICY "Public can update token on visit" ON access_tokens
  FOR UPDATE USING (true);

-- Indexes
CREATE INDEX idx_access_tokens_token ON access_tokens(token);
CREATE INDEX idx_access_tokens_request ON access_tokens(request_id);
CREATE INDEX idx_access_tokens_expires ON access_tokens(expires_at);
