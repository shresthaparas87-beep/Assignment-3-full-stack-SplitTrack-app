create table if not exists users (
  id uuid primary key,
  full_name text not null,
  email text not null,
  has_housemates boolean default false,
  created_at timestamptz default now()
);

create table if not exists households (
  id uuid primary key,
  name text not null,
  member_count integer not null,
  members jsonb default '[]'::jsonb,
  joined_via_code text,
  created_at timestamptz default now()
);

create table if not exists expenses (
  id uuid primary key,
  name text not null,
  amount numeric not null,
  category text not null,
  due_date date not null,
  paid_by text not null,
  split_method text not null,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key,
  name text not null,
  cost numeric not null,
  billing_cycle text not null,
  renewal_date date not null,
  shared boolean default true,
  created_at timestamptz default now()
);
