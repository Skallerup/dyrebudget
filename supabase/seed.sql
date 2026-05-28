-- DyreBudget.dk Seed Data

-- Affiliate partners
INSERT INTO affiliate_partners (slug, name, base_url, commission_rate) VALUES
  ('zooplus', 'Zooplus', 'https://www.zooplus.dk', 4.0),
  ('agria', 'Agria', 'https://www.agria.dk', 8.0),
  ('tryg', 'Tryg', 'https://www.tryg.dk', 6.0),
  ('med24', 'Med24', 'https://www.med24.dk', 5.0)
ON CONFLICT (slug) DO NOTHING;

-- Product categories
INSERT INTO product_categories (slug, name, pet_type, display_order) VALUES
  ('hundefoder', 'Hundefoder', 'dog', 1),
  ('kattefoder', 'Kattefoder', 'cat', 2),
  ('hundeforsikring', 'Hundeforsikring', 'dog', 3),
  ('katteforsikring', 'Katteforsikring', 'cat', 4),
  ('loppe-og-flaat', 'Loppe & Flåt', 'both', 5),
  ('hundesenge', 'Hundesenge', 'dog', 6),
  ('kattegrus', 'Kattegrus', 'cat', 7)
ON CONFLICT (slug) DO NOTHING;

-- Dogs
INSERT INTO pets (slug, name, pet_type, size_class, weight_min, weight_max, lifespan_min, lifespan_max, coat_type, activity_level, health_risk, cost_index, description, traits, popular_in)
VALUES
  ('labrador', 'Labrador Retriever', 'dog', 'large', 25, 36, 10, 12, 'short', 'high', 'medium', 55, 'Labrador Retrieveren er en af Danmarks mest populære hunderacer.', ARRAY['Familievenlig', 'Energisk', 'Nem at træne', 'Kærlig'], ARRAY['Familier', 'Aktive par']),
  ('golden-retriever', 'Golden Retriever', 'dog', 'large', 25, 34, 10, 12, 'long', 'high', 'medium', 62, 'Golden Retrieveren er en elskværdig og tålmodig race.', ARRAY['Tålmodig', 'Intelligent', 'Loyal'], ARRAY['Familier']),
  ('fransk-bulldog', 'Fransk Bulldog', 'dog', 'small', 8, 14, 10, 12, 'short', 'low', 'high', 82, 'Fransk Bulldog er populær i lejligheder men en af de dyreste racer.', ARRAY['Rolig', 'Charmerende', 'Kærlig'], ARRAY['Byboere']),
  ('mops', 'Mops', 'dog', 'small', 6, 9, 12, 15, 'short', 'low', 'high', 79, 'Mopsen er en sød og afslappet hund med alvorlige sundhedsudfordringer.', ARRAY['Rolig', 'Sjov', 'Kærlig'], ARRAY['Byboere', 'Seniorer']),
  ('beagle', 'Beagle', 'dog', 'medium', 9, 11, 12, 15, 'short', 'high', 'low', 38, 'Beaglen er en af de billigste hunderacer at eje over livet.', ARRAY['Robust', 'Nysgerrig', 'Venlig'], ARRAY['Familier']),
  ('schaeferhund', 'Schæferhund', 'dog', 'large', 22, 40, 9, 13, 'medium', 'high', 'medium', 60, 'Schæferhunden er intelligent, loyal og alsidig.', ARRAY['Intelligent', 'Loyal', 'Beskyttende'], ARRAY['Erfarne ejere']),
  ('border-collie', 'Border Collie', 'dog', 'medium', 14, 20, 12, 15, 'long', 'high', 'low', 48, 'Border Collien er verdens mest intelligente hund.', ARRAY['Ekstremt intelligent', 'Energisk', 'Lydig'], ARRAY['Erfarne ejere']),
  ('gravhund', 'Gravhund', 'dog', 'small', 4, 10, 12, 16, 'short', 'medium', 'medium', 42, 'Gravhunden er en dansk favorit og relativt billig at eje.', ARRAY['Modig', 'Vedholdende', 'Sjov'], ARRAY['Familier', 'Seniorer']),
  ('chihuahua', 'Chihuahua', 'dog', 'tiny', 1.5, 3, 14, 18, 'short', 'low', 'low', 22, 'Chihuahuaen er den billigste hund at eje i Danmark.', ARRAY['Modig', 'Loyal', 'Livlig'], ARRAY['Byboere', 'Seniorer']),
  ('puddel', 'Puddel (Miniature)', 'dog', 'small', 4, 7, 12, 15, 'long', 'medium', 'low', 52, 'Puddelen er intelligent og allergenevenlig.', ARRAY['Intelligent', 'Aktiv', 'Hypoallergen'], ARRAY['Allergikere']),
  ('dansk-svensk-gaardhund', 'Dansk-Svensk Gårdhund', 'dog', 'small', 7, 12, 13, 15, 'short', 'high', 'low', 30, 'Dansk-Svensk Gårdhund er en af de sundeste og billigste racer.', ARRAY['Sund', 'Aktiv', 'Intelligent'], ARRAY['Aktive familier', 'Budget-bevidste'])
ON CONFLICT (slug) DO NOTHING;

-- Cats
INSERT INTO pets (slug, name, pet_type, size_class, weight_min, weight_max, lifespan_min, lifespan_max, coat_type, activity_level, health_risk, cost_index, description, traits, popular_in)
VALUES
  ('maine-coon', 'Maine Coon', 'cat', 'large', 4, 9, 12, 15, 'long', 'medium', 'medium', 56, 'Maine Coon er en stor og imponerende kat med blid personlighed.', ARRAY['Venlig', 'Social', 'Legesyg'], ARRAY['Familier']),
  ('ragdoll', 'Ragdoll', 'cat', 'large', 4, 8, 12, 17, 'long', 'low', 'medium', 51, 'Ragdollen er en rolig og kærlig kat.', ARRAY['Rolig', 'Kærlig', 'Tilpasningsdygtig'], ARRAY['Familier med børn', 'Seniorer']),
  ('norsk-skovkat', 'Norsk Skovkat', 'cat', 'large', 4, 7, 14, 16, 'long', 'high', 'low', 40, 'Norsk Skovkat er en robust og sund race.', ARRAY['Robust', 'Aktiv', 'Uafhængig'], ARRAY['Husejere']),
  ('huskat', 'Huskat (Blandet race)', 'cat', 'medium', 3, 5, 14, 20, 'short', 'medium', 'low', 18, 'Huskatten er den billigste og mest robuste kat.', ARRAY['Robust', 'Selvstændig', 'Billig'], ARRAY['Alle']),
  ('british-shorthair', 'British Shorthair', 'cat', 'medium', 4, 7, 12, 17, 'short', 'low', 'medium', 43, 'British Shorthair er en rolig og sund race.', ARRAY['Rolig', 'Tålmodig', 'Nem at passe'], ARRAY['Familier', 'Byboere']),
  ('bengal', 'Bengal', 'cat', 'medium', 4, 7, 12, 16, 'short', 'high', 'medium', 58, 'Bengalen er en aktiv og vilter race med leopardmønster.', ARRAY['Aktiv', 'Intelligent', 'Legesyg'], ARRAY['Aktive par']),
  ('siameser', 'Siameser', 'cat', 'medium', 3, 5, 12, 20, 'short', 'high', 'low', 32, 'Siameseren er en talende og social kat med lang levetid.', ARRAY['Social', 'Talende', 'Intelligent'], ARRAY['Par', 'Enlige']),
  ('perser', 'Perser', 'cat', 'medium', 3, 6, 10, 15, 'long', 'low', 'high', 72, 'Perseren er smuk men dyr at eje.', ARRAY['Stille', 'Kærlig', 'Elegant'], ARRAY['Erfarne ejere'])
ON CONFLICT (slug) DO NOTHING;
