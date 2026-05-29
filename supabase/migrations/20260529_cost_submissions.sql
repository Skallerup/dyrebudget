-- ============================================
-- COST SUBMISSIONS TABLE (crowdsourced real costs)
-- "Hvad betaler du for din [race]?" — community data moat.
-- All access goes through the /api/cost-submissions server route using the
-- service-role key, so RLS is enabled with no public policies.
-- ============================================
CREATE TABLE IF NOT EXISTS cost_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  breed_slug TEXT NOT NULL,
  pet_type TEXT NOT NULL CHECK (pet_type IN ('dog', 'cat')),
  monthly_cost DECIMAL(10,2) NOT NULL CHECK (monthly_cost BETWEEN 100 AND 100000),
  has_insurance BOOLEAN,
  region TEXT,
  approved BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cost_submissions_breed_idx ON cost_submissions(breed_slug);
CREATE INDEX IF NOT EXISTS cost_submissions_created_at_idx ON cost_submissions(created_at);

-- RLS on, no public policies — only the service role (server route) may read/write.
ALTER TABLE cost_submissions ENABLE ROW LEVEL SECURITY;
