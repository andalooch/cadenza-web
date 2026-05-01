# cadenza-web

Marketing site + share viewer for Cadenza, deployed at https://cadenzagolf.com.

Two main routes:

- `/` — marketing landing page with email capture and pricing
- `/s/[token]` — public share viewer for individual swings (no login required)

Plus support routes:
- `/privacy`, `/terms` — legal pages
- `/api/signup` — POST endpoint for email signups (uses Resend)
- `/og/[token]` — dynamic Open Graph image generator for share previews

## Stack

- Next.js 14 (App Router)
- Tailwind CSS 3
- Supabase (server-side queries via service role key)
- Resend (email audience)
- Deployed on Vercel

## Deploy from scratch — first-time setup

### Step 1: Create the GitHub repo

```cmd
cd C:\Users\IT Loaner
mkdir cadenza-web
```

Copy the contents of this bundle into that folder. Then:

```cmd
cd cadenza-web
git init
git add .
git commit -m "Initial cadenza-web"
gh repo create andalooch/cadenza-web --public --source=. --push
```

(Or create the repo manually via github.com and push.)

### Step 2: Set up Resend audience

1. Go to https://resend.com/audiences
2. Click "Create audience"
3. Name it "Cadenza Beta Waitlist"
4. Copy the audience ID (UUID format)
5. Make sure your Resend API key is the production one — get it from
   https://resend.com/api-keys

### Step 3: Set up Vercel project

1. Go to https://vercel.com/new
2. Import the `cadenza-web` GitHub repo
3. Framework auto-detected as Next.js — leave defaults
4. Add environment variables:
   - `SUPABASE_URL` — `https://kgyziwkfkwlneaahfzft.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` — get from Supabase → Project Settings → API
     → service_role secret. **DO NOT use the anon key**, the service role
     bypasses RLS which is required for the share viewer.
   - `RESEND_API_KEY` — from step 2
   - `RESEND_AUDIENCE_ID` — from step 2
5. Click Deploy. First deploy takes ~2 minutes.
6. After deploy succeeds, you'll have a `cadenza-web-*.vercel.app` URL. Test it
   works (the `/` page should render).

### Step 4: Point cadenzagolf.com at Vercel

In Namecheap (where you bought the domain):

1. Domain List → Manage `cadenzagolf.com` → Advanced DNS
2. Delete any existing A/CNAME records pointing to parking pages
3. Add these records:
   - Type: A, Host: @, Value: `76.76.21.21`, TTL: Automatic
   - Type: CNAME, Host: www, Value: `cname.vercel-dns.com`, TTL: Automatic

In Vercel:

1. Project → Settings → Domains
2. Add `cadenzagolf.com`
3. Add `www.cadenzagolf.com`
4. Vercel auto-validates the DNS. Takes 5-30 minutes for DNS propagation.
5. Once validated, Vercel auto-issues an SSL cert.

### Step 5: Smoke test

After DNS propagates:

1. Visit `https://cadenzagolf.com` — should show the marketing landing
2. Try the email signup form — submit a real email
3. Check Resend → Audiences → Cadenza Beta Waitlist — should see the new contact
4. Visit `https://cadenzagolf.com/privacy` and `/terms` — should render
5. Generate a share link in the Cadenza app (after applying m11) — open in
   browser. Should show the swing analysis.
6. Send the share URL to yourself via iMessage. Should see a rich preview
   card with the score.

## Local development

```cmd
cd cadenza-web
copy .env.example .env.local
:: edit .env.local with your real keys
npm install
npm run dev
```

Visit http://localhost:3000.

## Cost

- Vercel: free tier handles thousands of visits/month
- Resend: free tier handles 3,000 contacts and 100 emails/day
- Supabase: same project as the app, no extra cost

Total: $0/month at current scale.

## Updating

After making changes, push to GitHub. Vercel auto-deploys. Each push to `main`
triggers a new production deploy. Branch pushes get preview URLs.

## What's NOT in this build

- Account deletion flow for the app (that's in the App Store sprint week)
- Subscription / Stripe integration (post-launch)
- Coach mode (separate milestone)
- Analytics beyond email count (add Vercel Analytics in the dashboard later)
