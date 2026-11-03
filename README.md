# StarGram

Telegram-inspired Mini App starter. This repository currently contains a front-end preview and a starter database schema.

## Included
- Mobile-first dark messenger-style interface
- Chat list preview and search
- Gift catalogue preview (illustrations only)
- Daily demo reward: 25 Stars, once per local calendar day
- Telegram Mini Apps SDK initialization and basic profile display when opened inside Telegram

## Important limitations
This is **not yet a production messenger**:
- Chat rows are demo content; messages are not sent or stored.
- The 25-Star balance is demo-only and stored in the current browser's localStorage. It is not Telegram Stars and has no cash value.
- Gift cards are illustrations, not real Telegram gifts or NFTs.
- Telegram user display data is shown for UI preview only. The backend must validate `Telegram.WebApp.initData` before trusting identity.
- Do not put bot tokens, Supabase service-role keys, or other secrets in this repository or browser JavaScript.

## Publish the preview with GitHub Pages
1. In GitHub, open **Settings → Pages**.
2. Select **Deploy from a branch**, branch `main`, folder `/public` is not supported by every Pages setup. For easiest publishing, move the contents of `public/` to the repository root, or configure a GitHub Actions Pages workflow.
3. Save and wait for deployment.

## Backend setup still required
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Deploy a server (for example, a small Python service) that validates Telegram `initData` using the bot token on the server.
4. Implement authenticated endpoints for profiles, messages, daily reward claims, and gift catalogue sync.
5. For official Telegram gifts, use the current Telegram Bot API methods and the bot's permitted access. Do not present the demo catalogue as official gifts.

## Suggested next milestone
Implement a backend endpoint that validates Telegram Mini App initData, creates/loads a profile, and awards the 25-point demo reward exactly once per UTC date using a database transaction.
