# Graph Report - fronted  (2026-07-08)

## Corpus Check
- 83 files · ~468,470 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 144 nodes · 86 edges · 8 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `apiFetch()` - 9 edges
2. `page()` - 7 edges
3. `Loading()` - 4 edges
4. `proxy()` - 3 edges
5. `BlogServer()` - 3 edges
6. `handlePayment()` - 3 edges
7. `ForgetPassword()` - 3 edges
8. `useSendOtp()` - 3 edges
9. `useVerifyOtp()` - 3 edges
10. `isTokenExpired()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `page()` --calls--> `apiFetch()`  [INFERRED]
  app/leaderboard/page.tsx → lib/apiFetch.ts
- `handlePayment()` --calls--> `apiFetch()`  [INFERRED]
  app/plans/plans.tsx → lib/apiFetch.ts
- `getPlans()` --calls--> `apiFetch()`  [INFERRED]
  app/superadmin/plansconfig/page.tsx → lib/apiFetch.ts
- `getPlanHistory()` --calls--> `apiFetch()`  [INFERRED]
  app/superadmin/plansconfig/page.tsx → lib/apiFetch.ts
- `updatePlan()` --calls--> `apiFetch()`  [INFERRED]
  app/superadmin/plansconfig/page.tsx → lib/apiFetch.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (7): apiFetch(), BlogServer(), fetchAIConfig(), fetchAIConfigHistory(), getPlanHistory(), getPlans(), updatePlan()

### Community 1 - "Community 1"
Cohesion: 0.2
Nodes (4): ForgetPassword(), page(), useSendOtp(), useVerifyOtp()

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (2): Loading(), handlePayment()

### Community 3 - "Community 3"
Cohesion: 0.83
Nodes (3): extractCookieValue(), isTokenExpired(), proxy()

### Community 4 - "Community 4"
Cohesion: 0.5
Nodes (2): PrivacyPolicyPage(), Providers()

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (2): BlogSection(), fetchBlogs()

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (2): getAILogs(), LogServer()

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (2): getAIStats(), Page()

## Knowledge Gaps
- **Thin community `Community 2`** (6 nodes): `loading.tsx`, `plans.tsx`, `loading.tsx`, `loading.tsx`, `Loading()`, `handlePayment()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (4 nodes): `page.tsx`, `providers.tsx`, `PrivacyPolicyPage()`, `Providers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (3 nodes): `BlogServer.tsx`, `BlogSection()`, `fetchBlogs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (3 nodes): `LogServer.tsx`, `getAILogs()`, `LogServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (3 nodes): `StatsServer.tsx`, `getAIStats()`, `Page()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `apiFetch()` connect `Community 0` to `Community 1`, `Community 2`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `page()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `handlePayment()` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `apiFetch()` (e.g. with `BlogServer()` and `handlePayment()`) actually correct?**
  _`apiFetch()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `page()` (e.g. with `apiFetch()` and `useSendOtp()`) actually correct?**
  _`page()` has 3 INFERRED edges - model-reasoned connections that need verification._