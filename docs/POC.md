# 2Sat-lite POC Documentation

## 📋 Table of Contents

1. [What is 2Sat-lite?](#what-is-2sat-lite)
2. [The Full Vision](#the-full-vision)
3. [POC Scope](#poc-scope)
4. [Why This POC Matters](#why-this-poc-matters)
5. [Technical Architecture](#technical-architecture)
6. [User Journey](#user-journey)
7. [Data Model](#data-model)
8. [Success Metrics](#success-metrics)
9. [Timeline](#timeline)
10. [Next Steps After POC](#next-steps-after-poc)

---

## What is 2Sat-lite?

**2Sat-lite** is a proof-of-concept for a monthly friend group update newsletter app. It solves the problem of **staying meaningfully connected with close friends** in a world where social media is overwhelming and group chats are chaotic.

### The Problem

- **Group chats die** after initial excitement
- **Social media is public** and performative
- **Life updates get lost** in endless scrolling
- **No ritual for staying in touch** with close friends

### The Solution

A structured, predictable ritual where friends share monthly life updates through a simple form, and everyone receives a beautifully formatted newsletter **every second Saturday**.

---

## The Full Vision

### What the Full App Will Be

A **mobile app** where private friend groups share monthly life updates through a structured form. Every **second Saturday**, everyone receives a beautifully formatted newsletter with all their friends' contributions - creating a predictable ritual for staying meaningfully connected.

### Key Features (Full App)

- **Dual-flow system**: Individual contributions (personal storytelling) + Group contributions (shared prompts)
- **Rich media**: Photos, videos, and text responses
- **Multiple groups**: Join different friend circles (college friends, work friends, family, etc.)
- **Beautiful newsletters**: HTML-formatted, Hinge-style visual layout
- **Mobile-first**: iOS + Android apps via Capacitor
- **Premium**: $3-6/month subscription, no free tier
- **Tech**: React/Next.js + Convex + TypeScript + Tailwind + Resend

### Business Model

- **$3-6/month** subscription per user
- **No free tier** (reduces spam, ensures quality users)
- Target: **10,000 users** in Year 1 ($30K-60K MRR)
- Monetization: Subscriptions only (no ads, no data selling)

---

## POC Scope

### What We're Building NOW

**A simplified web version to validate the core concept with real friends this month.**

### What It Has

✅ **Google/Facebook/Discord + Email login** (Clerk Auth)
✅ **One group** (hardcoded: "My Friend Group")
✅ **Simple contribution form** with 5 prompts:
   1. What did you do this month?
   2. Photo Wall (images/videos)
   3. One Good Thing
   4. On Your Mind
   5. What song are you listening to?

✅ **Automated newsletter** sent every 2nd Saturday via Resend
✅ **Archive view** to browse past newsletters
✅ **Convex database** storing everything

### What It Does

1. Friends log in with Clerk (Google/Email/etc.)
2. Fill out monthly contribution form
3. Automated cron job sends HTML newsletter on 2nd Saturday
4. Everyone gets email with all responses beautifully formatted
5. Can view past newsletters in archive

### What It Doesn't Have (Yet)

❌ Multiple friend groups
❌ Individual contribution flows
❌ Mobile apps
❌ Payment/subscriptions
❌ Advanced newsletter (video embeds, Spotify players)
❌ Notifications (push, SMS reminders)

---

## Why This POC Matters

### Validation Goals

1. **Proves people will use it**: Do friends actually fill out the form?
2. **Tests engagement**: Do people read the newsletter?
3. **Validates willingness to pay**: Would friends pay $3-6/month for this?
4. **Gets real feedback**: What features are missing? What would they change?
5. **Tests Convex**: Is Convex the right backend for this app?

### Why POC First?

- ✅ **Validates concept** with real friends NOW (not in 6 months)
- ✅ **Tests tech stack** before committing to full build
- ✅ **Gets real feedback** on prompts, timing, engagement
- ✅ **Proves demand** before investing months of work
- ✅ **Actually useful** - you use it while building the real thing

### Success Criteria

**After 1 month of usage:**

- [ ] 80%+ of friends submit contributions each month
- [ ] 90%+ open newsletter email
- [ ] 50%+ say they'd pay $3-6/month
- [ ] Positive feedback on prompts and format
- [ ] No critical bugs or data loss

---

## Technical Architecture

### Tech Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| **Frontend** | Next.js 15 + React 19 + TypeScript | Modern, fast, SEO-friendly |
| **Backend** | Convex | Real-time, reactive, easy to use |
| **Auth** | Clerk | Social logins, easy integration |
| **Email** | Resend | Reliable, developer-friendly |
| **Styling** | Tailwind CSS + DaisyUI | Fast development, consistent design |
| **Testing** | Playwright | E2E tests, self-validation |
| **CI/CD** | GitHub Actions | Automated testing and deployment |
| **Hosting** | Vercel (frontend) + Convex Cloud (backend) | Serverless, scalable, free tier |

### Why These Choices?

**Convex**:
- Real-time reactivity (perfect for collaborative apps)
- Easy to learn, fast to build
- Built-in auth integration
- Free tier covers POC needs

**Clerk**:
- Social logins out of the box
- Great UX, minimal code
- Free tier: 5K MAU

**Resend**:
- Developer-friendly email API
- Beautiful HTML emails
- Free tier: 100 emails/day

**Next.js + React**:
- Can become mobile app later (Capacitor)
- Great DX, fast development
- SEO-friendly for landing pages

---

## User Journey

### 1. Sign Up / Sign In

```
User visits 2sat-lite.vercel.app
  ↓
Clicks "Sign In"
  ↓
Chooses Google/Facebook/Discord/Email
  ↓
Authenticates via Clerk
  ↓
Redirected to /dashboard
```

### 2. Fill Out Monthly Contribution

```
User clicks "Contribute" in navigation
  ↓
Lands on /contribute page
  ↓
Sees 5 prompts:
  1. What did you do this month? (long text)
  2. Photo Wall (upload images/videos)
  3. One Good Thing (short text)
  4. On Your Mind (medium text)
  5. What song are you listening to? (short text)
  ↓
Types responses, uploads photos
  ↓
Clicks "Save Draft" (auto-saves every 30s)
  ↓
Clicks "Submit" when ready
  ↓
Confirmation: "Contribution submitted! See you on 2nd Saturday!"
```

### 3. Receive Newsletter

```
2nd Saturday arrives
  ↓
Cron job triggers at 9:00 AM
  ↓
Convex queries all submitted contributions for the month
  ↓
Generates HTML newsletter with all responses
  ↓
Sends via Resend to all group members
  ↓
Users receive email: "Your monthly 2Sat-lite newsletter is here!"
  ↓
Users open email, read friends' updates
  ↓
Can click to view in browser (archive link)
```

### 4. Browse Archive

```
User visits /archive
  ↓
Sees list of all past newsletters (newest first)
  ↓
Clicks on a month (e.g., "January 2025")
  ↓
Views full HTML newsletter in browser
  ↓
Scrolls through all friends' contributions
```

---

## Data Model

### Users

```typescript
{
  _id: Id<"users">,
  clerkId: string,           // From Clerk
  email: string,
  name: string,
  profileImage: string,      // Avatar URL
  joinedAt: number,          // Timestamp
}
```

### Contributions

```typescript
{
  _id: Id<"contributions">,
  userId: Id<"users">,
  groupId: Id<"groups">,
  month: string,             // "2025-01"

  prompt1: string,           // What did you do this month?
  prompt2: string[],         // Photo Wall (image URLs)
  prompt3: string,           // One Good Thing
  prompt4: string,           // On Your Mind
  prompt5: string,           // Song you're listening to

  status: "draft" | "submitted",
  submittedAt: number,       // Timestamp
  updatedAt: number,         // Timestamp
}
```

### Groups

```typescript
{
  _id: Id<"groups">,
  name: string,              // "My Friend Group"
  createdAt: number,
  memberIds: Id<"users">[],  // Array of user IDs
}
```

### Newsletters

```typescript
{
  _id: Id<"newsletters">,
  groupId: Id<"groups">,
  month: string,             // "2025-01"
  htmlContent: string,       // Full HTML email
  recipientEmails: string[], // Who received it
  sentAt: number,            // Timestamp
  resendId: string,          // Resend email ID (for tracking)
}
```

---

## Success Metrics

### Engagement Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Monthly submission rate** | 80%+ | % of users who submit each month |
| **Newsletter open rate** | 90%+ | Resend analytics |
| **Time to complete form** | <5 min | Average form completion time |
| **Newsletter read time** | >2 min | Resend analytics (if available) |

### Validation Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Willingness to pay** | 50%+ | Survey after 1 month |
| **Prompt satisfaction** | 4/5+ | User feedback survey |
| **Newsletter satisfaction** | 4/5+ | User feedback survey |
| **Feature requests** | <5 critical | User feedback survey |

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page load time** | <2s | Lighthouse, real user metrics |
| **Form submission time** | <1s | Client-side tracking |
| **Newsletter gen time** | <30s | Convex function duration |
| **Email delivery success** | >95% | Resend delivery reports |
| **Uptime** | >99% | Vercel/Convex monitoring |
| **Data loss incidents** | 0 | Manual tracking |

---

## Timeline

### Phase 1: Setup (Week 1)
- ✅ Agentic framework documentation
- ✅ GitHub Actions + worktrees
- ✅ Convex schema
- ⏳ Playwright testing setup
- ⏳ Environment configuration

### Phase 2: Auth & User Management (Week 1-2)
- ⏳ Clerk integration (sign up, sign in, sign out)
- ⏳ User sync to Convex database
- ⏳ Protected routes middleware
- ⏳ Dashboard UI

### Phase 3: Contribution Form (Week 2-3)
- ⏳ Form UI with 5 prompts
- ⏳ Image/video upload (Convex storage or Cloudinary)
- ⏳ Auto-save draft every 30s
- ⏳ Submit functionality
- ⏳ Edit existing contributions

### Phase 4: Newsletter Generation (Week 3-4)
- ⏳ HTML newsletter template
- ⏳ Cron job (2nd Saturday automation)
- ⏳ Resend integration
- ⏳ Database record of sent newsletters

### Phase 5: Archive & Polish (Week 4)
- ⏳ Archive page (list newsletters)
- ⏳ View individual newsletter
- ⏳ Mobile responsive design
- ⏳ Error handling
- ⏳ Final testing

### Phase 6: Launch & Monitor (Week 5)
- ⏳ Invite friends to join
- ⏳ Monitor usage (analytics)
- ⏳ Collect feedback
- ⏳ Iterate based on usage

---

## Next Steps After POC

### If Validation is Successful (80%+ submission rate, 50%+ willing to pay)

#### Short Term (1-2 months)
1. **Add multiple friend groups** (join/create groups)
2. **Individual contribution flow** (personal storytelling beyond group prompts)
3. **Stripe payment integration** ($3-6/month subscription)
4. **Onboarding flow** (invite friends, create first group)

#### Medium Term (3-6 months)
5. **Mobile apps** (iOS + Android via Capacitor)
6. **Advanced newsletter** (video embeds, Spotify players, interactive elements)
7. **Notifications** (push, email, SMS reminders to contribute)
8. **Admin tools** (group management, moderation)

#### Long Term (6-12 months)
9. **AI-powered features** (prompt suggestions, photo curation)
10. **Social features** (reactions, comments on contributions)
11. **Export & archive** (download all contributions as PDF/book)
12. **White-label** (companies/organizations can self-host)

### If Validation Fails

**Pivot based on feedback:**

- **Low submission rate**: Simplify form, reduce prompts, change timing
- **Low newsletter engagement**: Improve layout, add interactivity
- **Price resistance**: Lower price, add free tier, or pivot to B2B
- **Feature gaps**: Prioritize most-requested features
- **Tech issues**: Switch backend, optimize performance

---

## FAQs

### Why "2Sat-lite"?

- **2Sat** = Second Saturday (when newsletter is sent)
- **lite** = Lightweight POC version (full app coming later)

### Why second Saturday specifically?

- **Predictable ritual**: Same day every month
- **Mid-month timing**: Not too early, not too late
- **Weekend**: People have time to read and reflect

### Why only one group for POC?

- **Simplifies development**: Focus on core loop, not group management
- **Easier to test**: All friends in one group = more data
- **Validates concept first**: Prove single-group works before multi-group

### Why charge $3-6/month eventually?

- **Reduces spam**: Only serious users will pay
- **Sustains development**: Covers hosting, maintenance, improvements
- **Quality over quantity**: Small groups of engaged friends, not masses

### What if friends don't want to pay?

- **That's the validation**: If they won't pay, it's not valuable enough
- **Pivot or iterate**: Adjust pricing, add features, or pivot model
- **B2B option**: Companies could pay for employee engagement

---

## Resources

### Documentation
- [Agentic Framework](./.claude/claude.md)
- [Changelog](./.claude/CHANGELOG.md)
- [Testing Guide](./.claude/TESTING.md)
- [Worktree Guide](./.claude/workflows/README.md)

### External Services
- [Convex Dashboard](https://dashboard.convex.dev)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Resend Dashboard](https://resend.com/emails)
- [Vercel Dashboard](https://vercel.com/dashboard)

### Tech Docs
- [Convex Docs](https://docs.convex.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Playwright Docs](https://playwright.dev/)
- [Resend Docs](https://resend.com/docs)

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
**Product Owner**: Kalyan Chandana
**Status**: POC In Development
