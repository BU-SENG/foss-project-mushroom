-- Profiles table
create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text,
    role text not null check (
        role in ('student', 'admin')
    ),
    created_at timestamptz default now()
);

-- Maintenance requests
create table if not exists public.maintenance_requests (
    id bigserial primary key,
    student_id uuid not null references public.profiles (id) on delete cascade,
    category text not null,
    room text not null,
    description text,
    status text not null default 'pending' check (
        status in (
            'pending',
            'in_progress',
            'resolved'
        )
    ),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Trigger for updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_set_updated_at
before update on public.maintenance_requests
for each row execute procedure public.set_updated_at();

-- Seed profiles
insert into
    public.profiles (id, full_name, role)
values (
        '2f6e1069-bf1f-40c4-9ddc-bf7dc3caf435',
        'Roni',
        'admin'
    ),
    (
        'eac064b2-e1ce-43a0-a6e4-cf8db2959e95',
        'Jane Student',
        'student'
    );