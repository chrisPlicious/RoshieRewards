# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: a single self-contained `index.html` (inline CSS + vanilla JS, no build step, no install). Chosen because a teacher can double-click it, run it offline, share it as one file, and screen-share it from any laptop. State (kids, stars, prizes, uploaded prize photos) lives in the browser's `localStorage`. Fonts are embedded as base64 so it renders correctly offline.

The user expected React and asked (2026-11-18) to **convert to React later**; until then the single file stays.

## Users

- **Primary operator: an ESL teacher of young children.** Mid-lesson, they need to award a star in one click without breaking the flow of the lesson, then run a reward spin at the end.
- **Primary audience: the children (ESL learners).** They watch the stars pile up and the wheel spin. Inferred (user gave no preference): ages roughly 4–10, many are pre-readers or early readers of English, so every important state must read through picture, color, number, and motion, not English text alone.

## Product Purpose

A classroom reward board: each time a child answers, the teacher gives a star; stars accumulate across the lesson; at the end the child spins a prize wheel whose rewards the teacher writes themselves. Success = kids visibly excited to earn the next star, and the teacher never fumbling the controls.

## Positioning

Not a generic random-picker wheel and not a behavior-tracking app. Stars are earned live by answering in class, and the stars are what pay for the spin, so the end-of-lesson spin feels earned.

## Operating Context

Inferred (user gave no preference; design must hold for all):

- Shown either through screen-share on a video call (small, compressed video) or on a classroom TV/projector. Big shapes, high contrast, large numbers; nothing important at small sizes.
- Teacher drives with mouse/trackpad or keyboard; a kid may tap on a tablet.
- 1-on-1 lessons and small groups are both common in kids' ESL: support one student by default, with optional extra named students, each with their own star count.

## Capabilities and Constraints

- Product name: **Rewards**.
- Award a star (and undo a mistaken one) per student; star count persists across a page reload. Every star shows a "Good job, NAME!" message and a confetti pop.
- Star goal (teacher-configurable, default 5): filling the goal shows a **"Reward time!" prompt with Claim reward / Later**. Unclaimed rewards wait on the kid's strip as a "Claim reward" button. A "Free spins" option lets kids spin without stars.
- **The wheel is hidden on the board.** It only comes out when a reward is claimed (and as a live preview beside the editor on desktop). Winning shows "Good job, NAME!" with the prize and confetti.
- Prize wheel with teacher-editable rewards (2–12): add, rename, remove, choose a color and a drawn picture, or **upload a photo** per prize (Wheel of Names style), including adding several prizes from photos at once or by drag and drop.
- Reset for a new lesson.
- Works offline, no accounts, no server.
- Terminology: "stars", "star goal", "claim reward", "rewards", "prize wheel".

## Evidence on Hand

None. No logo, brand, mascot, or real reward list was provided. Default rewards are authored placeholders the teacher replaces.

## Product Principles

1. The teacher's click must be instant and unmissable: awarding a star never takes more than one action.
2. Every moment reads without reading: counts, progress, and prizes are shown as pictures, numbers, and motion.
3. Earned, not random: the spin visibly comes from the stars collected.
4. The teacher owns the rewards: customizing the wheel is quick and forgiving.

## Accessibility & Inclusion

Young, non-native English audience: icon-first, large type, high contrast that survives video compression. Respect `prefers-reduced-motion` while keeping the spin result clear. Sound effects must be mutable by the teacher.
