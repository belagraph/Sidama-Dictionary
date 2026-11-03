# Sidaamu Afoo Dictionary

A Sidama-first dictionary website starter built with Next.js, React, TypeScript, and CSS.

## Language priorities

1. Sidaamu Afoo — primary language, with Latin and Ethiopic script support.
2. Amharic — supporting translation.
3. English — supporting translation.

## Important content policy

The starter intentionally has an empty dictionary dataset. It does not invent Sidama words, Ethiopic spellings, pronunciation, or translations. Add entries only after review by fluent Sidaamu Afoo speakers or language experts.

The contribution form and pronunciation control are currently front-end demonstrations. Submissions are not stored, and pronunciation needs verified audio recordings or a reviewed text-to-speech solution.

## Run locally

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Create a GitHub repository and upload this project.
2. Sign in to Vercel using your own account.
3. Choose **Add New → Project** and import the GitHub repository.
4. Keep the detected Next.js settings and select **Deploy**.

No environment variables are required for this front-end starter.

## Next development milestones

- Supabase database for dictionary entries, user accounts, and saved words.
- Admin/editor dashboard with review, approval, and correction workflow.
- Verified Sidama Latin and Ethiopic spellings linked to one entry.
- Native-speaker audio uploads and pronunciation recordings.
- Search indexing across all three languages and both Sidama scripts.
- Contributor profiles, moderation, and revision history.
- Persistent favorites and word-of-the-day management.

## Data model

See `src/lib/dictionary.ts` for the initial entry type. Keep the Sidama Latin and Ethiopic spellings in the same record, not as duplicate entries.
