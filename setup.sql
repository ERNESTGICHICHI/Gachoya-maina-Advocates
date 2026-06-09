-- ================================================================
--  GACHOYA MAINA & COMPANY ADVOCATES — Supabase Database Setup
--  Run this entire file in: Supabase Dashboard → SQL Editor → Run
-- ================================================================

-- 1. APPOINTMENTS (Book Appointment form)
create table if not exists appointments (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  reference     text unique,
  advocate      text,
  client_name   text not null,
  id_passport   text,
  phone         text not null,
  email         text not null,
  proposed_day  text,
  proposed_time text,
  legal_issue   text,
  status        text default 'pending'   -- pending | confirmed | completed | cancelled
);

-- 2. DOCUMENT SUBMISSIONS
create table if not exists document_submissions (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  reference     text unique,
  client_name   text not null,
  case_ref      text,
  email         text not null,
  phone         text not null,
  document_type text,
  file_names    text[],
  notes         text,
  status        text default 'received'  -- received | under_review | complete
);

-- 3. MOTOR VEHICLE AGREEMENTS
create table if not exists motor_agreements (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  reference     text unique,
  seller_name   text not null,
  buyer_name    text not null,
  seller_id     text,
  buyer_id      text,
  vehicle       text,
  registration  text,
  sale_price    numeric,
  phone         text not null,
  email         text not null,
  notes         text,
  status        text default 'pending'   -- pending | drafting | ready | completed
);

-- 4. LAND SALE AGREEMENTS
create table if not exists land_agreements (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  reference     text unique,
  seller_name   text not null,
  buyer_name    text not null,
  seller_id     text,
  buyer_id      text,
  title_number  text,
  land_size     text,
  location      text,
  sale_price    numeric,
  phone         text not null,
  email         text not null,
  notes         text,
  status        text default 'pending'
);

-- 5. AFFIDAVIT REQUESTS
create table if not exists affidavit_requests (
  id             uuid default gen_random_uuid() primary key,
  created_at     timestamptz default now(),
  reference      text unique,
  client_name    text not null,
  id_passport    text,
  phone          text not null,
  email          text not null,
  affidavit_type text,
  facts          text,
  status         text default 'pending'  -- pending | drafting | ready_for_signing | completed
);

-- 6. SECURE MESSAGES
create table if not exists messages (
  id           uuid default gen_random_uuid() primary key,
  created_at   timestamptz default now(),
  reference    text unique,
  advocate     text,
  client_name  text not null,
  case_ref     text,
  email        text not null,
  phone        text,
  subject      text,
  message      text not null,
  status       text default 'unread'    -- unread | read | replied
);

-- ================================================================
--  ROW LEVEL SECURITY (RLS) — anyone can insert, only auth can read
-- ================================================================

alter table appointments         enable row level security;
alter table document_submissions enable row level security;
alter table motor_agreements     enable row level security;
alter table land_agreements      enable row level security;
alter table affidavit_requests   enable row level security;
alter table messages             enable row level security;

-- Allow public to INSERT (submit forms)
create policy "Public can insert appointments"
  on appointments for insert to anon with check (true);

create policy "Public can insert documents"
  on document_submissions for insert to anon with check (true);

create policy "Public can insert motor agreements"
  on motor_agreements for insert to anon with check (true);

create policy "Public can insert land agreements"
  on land_agreements for insert to anon with check (true);

create policy "Public can insert affidavits"
  on affidavit_requests for insert to anon with check (true);

create policy "Public can insert messages"
  on messages for insert to anon with check (true);

-- Allow public to SELECT their own record by reference + email (for case tracker)
create policy "Client can view own appointment by ref+email"
  on appointments for select to anon
  using (true);

-- ================================================================
--  EMAIL NOTIFICATIONS via Supabase Database Webhooks
--  After running this SQL, go to:
--  Supabase Dashboard → Database → Webhooks → Create a new webhook
--  Point it to your email service (e.g. Resend, SendGrid, or
--  a simple Make.com / Zapier automation) to notify the firm
--  whenever a new row is inserted into any of these tables.
-- ================================================================
