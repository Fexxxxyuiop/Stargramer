-- StarGram starter schema. Run in Supabase SQL Editor.
-- Never store Telegram bot tokens or trust client-supplied Telegram user IDs.
create table if not exists public.profiles (
  id bigint primary key, -- Telegram user ID, populated only after server verifies initData
  username text,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.wallets (
  user_id bigint primary key references public.profiles(id) on delete cascade,
  demo_stars bigint not null default 0 check (demo_stars >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_claims (
  user_id bigint not null references public.profiles(id) on delete cascade,
  claim_date date not null,
  amount integer not null default 25 check (amount = 25),
  primary key (user_id, claim_date)
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  sender_id bigint not null references public.profiles(id),
  recipient_id bigint not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists messages_pair_time
on public.messages(sender_id, recipient_id, created_at desc);

create table if not exists public.gift_catalog_cache (
  gift_id text primary key,
  title text not null,
  image_url text,
  updated_at timestamptz not null default now()
);

-- Enable RLS before exposing any table through Supabase APIs.
alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.daily_claims enable row level security;
alter table public.messages enable row level security;
alter table public.gift_catalog_cache enable row level security;

-- No public write policies are intentionally created here.
-- Add narrowly scoped policies only after server-side Telegram initData verification.
