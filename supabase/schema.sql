-- DyreBudget.dk Supabase Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  pet_type TEXT NOT NULL CHECK (pet_type IN ('dog', 'cat')),
  size_class TEXT NOT NULL CHECK (size_class IN ('tiny', 'small', 'medium', 'large', 'giant')),
  weight_min DECIMAL(5,2),
  weight_max DECIMAL(5,2),
  lifespan_min INT,
  lifespan_max INT,
  coat_type TEXT CHECK (coat_type IN ('short', 'medium', 'long', 'wire')),
  activity_level TEXT CHECK (activity_level IN ('low', 'medium', 'high')),
  health_risk TEXT CHECK (health_risk IN ('low', 'medium', 'high')),
  cost_index INT NOT NULL DEFAULT 50 CHECK (cost_index BETWEEN 0 AND 100),
  description TEXT,
  traits TEXT[] DEFAULT '{}',
  popular_in TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COST PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cost_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  budget_level TEXT NOT NULL CHECK (budget_level IN ('budget', 'medium', 'premium')),
  monthly_food DECIMAL(10,2) NOT NULL,
  monthly_insurance DECIMAL(10,2) NOT NULL,
  monthly_vet_avg DECIMAL(10,2) NOT NULL,
  monthly_grooming DECIMAL(10,2) NOT NULL,
  one_time_costs DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (pet_id, budget_level)
);

-- ============================================
-- PRODUCT CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  pet_type TEXT CHECK (pet_type IN ('dog', 'cat', 'both')),
  display_order INT DEFAULT 0
);

-- ============================================
-- AFFILIATE PARTNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS affiliate_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  base_url TEXT,
  commission_rate DECIMAL(5,2),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category_id UUID REFERENCES product_categories(id),
  partner_id UUID REFERENCES affiliate_partners(id),
  price DECIMAL(10,2) NOT NULL,
  price_per_kg DECIMAL(10,2),
  price_per_day DECIMAL(10,2),
  affiliate_url TEXT NOT NULL,
  image_url TEXT,
  rating DECIMAL(3,2) DEFAULT 4.0,
  badges TEXT[] DEFAULT '{}',
  pet_type TEXT CHECK (pet_type IN ('dog', 'cat', 'both')),
  description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ARTICLES / GUIDES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  content TEXT,
  pet_type TEXT CHECK (pet_type IN ('dog', 'cat', 'both')),
  category TEXT,
  read_time_minutes INT DEFAULT 5,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
  page_slug TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMAIL LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  breed_name TEXT,
  estimated_monthly_cost DECIMAL(10,2),
  source TEXT,
  consented BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_leads_email_idx ON email_leads(email);
CREATE INDEX IF NOT EXISTS email_leads_created_at_idx ON email_leads(created_at);

-- ============================================
-- CALCULATOR SESSIONS TABLE (anonymous analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS calculator_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT,
  pet_type TEXT,
  breed_slug TEXT,
  budget_level TEXT,
  monthly_cost DECIMAL(10,2),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMPARISONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  breed_a_id UUID REFERENCES pets(id),
  breed_b_id UUID REFERENCES pets(id),
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE email_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_sessions ENABLE ROW LEVEL SECURITY;

-- Public can insert email leads
CREATE POLICY "Anyone can insert email leads" ON email_leads
  FOR INSERT WITH CHECK (TRUE);

-- Public can insert calculator sessions
CREATE POLICY "Anyone can insert calculator sessions" ON calculator_sessions
  FOR INSERT WITH CHECK (TRUE);

-- Public read access to pets, products, etc.
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pets" ON pets FOR SELECT USING (TRUE);

ALTER TABLE cost_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cost_profiles" ON cost_profiles FOR SELECT USING (TRUE);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active products" ON products FOR SELECT USING (active = TRUE);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published articles" ON articles FOR SELECT USING (published = TRUE);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (TRUE);

ALTER TABLE affiliate_partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active partners" ON affiliate_partners FOR SELECT USING (active = TRUE);

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON product_categories FOR SELECT USING (TRUE);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pets_updated_at BEFORE UPDATE ON pets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
