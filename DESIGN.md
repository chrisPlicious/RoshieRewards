---
name: Rewards
description: A classroom star board and prize wheel cut from construction paper, masking tape and gold foil stickers.
colors:
  gold: "#FFC21A"
  gold-hi: "#FFE27A"
  gold-ink: "#3A2200"
  grass: "#23874A"
  poster-red: "#DC3B26"
  poster-red-fold: "#A8291A"
  construction-sky: "#2F7FE0"
  sky-ink: "#0F3D86"
  ink: "#231C45"
  ink-soft: "#4B4570"
  paper-white: "#FFFFFF"
  paper-wash: "#F2F6FC"
  sky-wash: "#EAF2FD"
  paper-crease: "#E2E8F3"
  sticky-note: "#FFF27A"
  masking-tape: "rgba(246,236,205,.9)"
  notebook-margin: "#F2A0A8"
  notebook-rule: "#CFE0F6"
  paint-red: "#DC3B26"
  paint-red-lo: "#A8291A"
  paint-red-label: "#FFFFFF"
  paint-orange: "#F7801E"
  paint-orange-lo: "#C25A08"
  paint-orange-label: "#3A1A00"
  paint-yellow: "#FFC21A"
  paint-yellow-lo: "#CF8A00"
  paint-yellow-label: "#3A2200"
  paint-lime: "#9BCB2E"
  paint-lime-lo: "#6E9614"
  paint-lime-label: "#1F2E00"
  paint-green: "#23874A"
  paint-green-lo: "#17643A"
  paint-green-label: "#FFFFFF"
  paint-teal: "#13A89E"
  paint-teal-lo: "#0B7A72"
  paint-teal-label: "#032E2B"
  paint-sky: "#47B5F0"
  paint-sky-lo: "#1E86C2"
  paint-sky-label: "#06304A"
  paint-blue: "#2A5CD6"
  paint-blue-lo: "#1A3E9E"
  paint-blue-label: "#FFFFFF"
  paint-purple: "#7A4CC2"
  paint-purple-lo: "#56328F"
  paint-purple-label: "#FFFFFF"
  paint-pink: "#F0609E"
  paint-pink-lo: "#C23A76"
  paint-pink-label: "#3B0A22"
typography:
  display:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(32px, 3.6vw, 52px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: ".01em"
  headline:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(32px, 4.4vw, 56px)"
    fontWeight: 400
    lineHeight: 1.02
  numeral:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(34px, 3vw, 48px)"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "tnum"
  praise:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(28px, 3vw, 48px)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(28px, 3vw, 36px)"
    fontWeight: 400
    lineHeight: 1
  section:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.1
  button:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(19px, 1.7vw, 23px)"
    fontWeight: 400
    lineHeight: 1
  claim:
    fontFamily: "'Bagel Fat One', 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(17px, 1.5vw, 22px)"
    fontWeight: 400
    lineHeight: 1
  lead:
    fontFamily: "'Andika', 'Century Gothic', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(18px, 1.8vw, 22px)"
    fontWeight: 700
    lineHeight: 1.35
  name-tag:
    fontFamily: "'Andika', 'Century Gothic', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "clamp(18px, 1.5vw, 23px)"
    fontWeight: 700
    lineHeight: 1.1
  field:
    fontFamily: "'Andika', 'Century Gothic', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
  label:
    fontFamily: "'Andika', 'Century Gothic', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "'Andika', 'Century Gothic', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  label-sm:
    fontFamily: "'Andika', 'Century Gothic', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  note: "2px"
  label: "6px"
  card: "8px"
  rail: "10px"
  strip: "12px"
  row: "14px"
  chip: "16px"
  spine: "18px"
  pill: "999px"
  disc: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  gutter: "clamp(26px, 3.4vw, 52px)"
  lane-gap: "clamp(18px, 3vh, 30px)"
  notebook-inset: "66px"
components:
  tool-sticker:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px 2px"
    height: "52px"
  tool-sticker-round:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "52px"
  kid-strip:
    backgroundColor: "{colors.paint-red}"
    textColor: "{colors.ink}"
    rounded: "{rounded.strip}"
    padding: "16px 20px"
    width: "min(100%, 1000px)"
  name-tag:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    typography: "{typography.name-tag}"
    rounded: "{rounded.label}"
    padding: ".4em .85em .5em"
    height: "44px"
  gift-sticker:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.paint-red}"
    rounded: "{rounded.disc}"
    size: "calc(var(--tag) * 1.75)"
  star-count:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    typography: "{typography.numeral}"
    rounded: "{rounded.chip}"
    padding: ".08em .32em .1em .22em"
  star-rail:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.rail}"
    padding: "10px"
  star-button:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.disc}"
    size: "clamp(56px, 7.6vh, 68px)"
  undo-button:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.disc}"
    size: "46px"
  claim-pill:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    typography: "{typography.claim}"
    rounded: "{rounded.pill}"
    padding: "0 18px 2px 14px"
    height: "54px"
  claim-badge:
    backgroundColor: "{colors.poster-red}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    height: "28px"
  need-label:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.rail}"
    padding: "8px 12px 9px"
  button-primary:
    backgroundColor: "{colors.grass}"
    textColor: "{colors.paper-white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 26px 2px"
    height: "58px"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 26px 2px"
    height: "58px"
  button-gold-big:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.pill}"
    padding: "0 32px 2px"
    height: "66px"
  button-plain:
    backgroundColor: "{colors.paper-wash}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 26px 2px"
    height: "58px"
  button-danger:
    backgroundColor: "{colors.poster-red}"
    textColor: "{colors.paper-white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "52px"
  paper-card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(22px, 3.4vh, 36px) clamp(20px, 3vw, 40px) clamp(22px, 3vh, 30px)"
    width: "min(560px, calc(100vw - 40px))"
  spin-tag:
    backgroundColor: "{colors.paint-red}"
    textColor: "{colors.paint-red-label}"
    rounded: "{rounded.card}"
    padding: ".35em .95em .45em"
  wheel-hub:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.disc}"
    width: "24%"
  praise-tag:
    backgroundColor: "{colors.paint-purple}"
    textColor: "{colors.paint-purple-label}"
    typography: "{typography.praise}"
    rounded: "{rounded.strip}"
    padding: ".3em .7em .38em"
  sticky-tip:
    backgroundColor: "{colors.sticky-note}"
    textColor: "{colors.ink}"
    rounded: "{rounded.note}"
    padding: "14px 18px 16px"
  editor-drawer:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.spine}"
    width: "min(560px, 100vw)"
  drawer-row:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "8px"
  field:
    backgroundColor: "{colors.paper-wash}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.rail}"
    padding: "11px 13px"
  add-dashed:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.sky-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.row}"
    height: "54px"
  stepper-step:
    backgroundColor: "{colors.paper-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.disc}"
    size: "48px"
  switch-track-on:
    backgroundColor: "{colors.grass}"
    rounded: "{rounded.pill}"
    width: "62px"
    height: "36px"
  popover:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.chip}"
    padding: "12px"
  paint-chip:
    backgroundColor: "{colors.paint-red}"
    rounded: "{rounded.disc}"
    size: "44px"
  picture-chip:
    backgroundColor: "{colors.paint-red}"
    textColor: "{colors.paint-red-label}"
    rounded: "{rounded.strip}"
    size: "52px"
---

# Design System: Rewards

## Overview

**Creative North Star: "Classroom craft paper"**

Rewards is a bulletin board a teacher made by hand. The ground is a sheet of sky-blue construction paper inside a scalloped rainbow border; a cut-paper sun, clouds, a rainbow and two hills sit around the edges. Each kid gets a strip of construction paper in their own colour, held on with two pieces of masking tape. Their name is on a white paper label. Each answer sticks a smiling gold foil star into one of the crayon outlines on that strip. When the strip is full, a paper card taped to the board says "Reward time!". Only then does the paper-plate spinner come out. The prize lands on a card that hangs alone on red yarn with pink clips, and a round gift sticker joins the kid's name label. Everything is something a child could find in a classroom craft drawer, and every surface carries a faint paper-fibre grain.

The world is loud in colour and quiet in structure. There are ten saturated construction-paper paints, and each comes as a set of three: the paper, its shade and a label ink. Gold foil is the one precious material, and it is only spent on stars and on the reward path. Text never floats on colour. It sits on white paper labels, or it is set in the paint's own label ink. Pieces are placed by hand: strips, tags, cards and chips each lean a degree or two, and the tape leans further. Depth is real lift, with soft navy shadows as if daylight were falling on blue paper. Motion is springy and sticky (things stick on, pop, wiggle and hop), and every celebration is also a sound.

The thesis refuses two things, and so does this file: the pastel-gradient kids app, and the carnival wheel that is always on screen. The board at rest is stars and strips only. The wheel only appears once a reward is claimed, or as a live preview beside the editor on desktop.

**Key Characteristics:**
- A sky construction-paper ground with fibre grain, a 14px rainbow scalloped border, and a cut-paper scene that is decoration only.
- Kid strips in saturated paint colours, each taped on with masking tape and tilted ±0.5deg.
- Gold foil sticker stars with a die-cut white edge and a blinking face, placed into crayon-dashed outlines.
- Rewards won are kept as round white gift stickers beside the kid's name.
- White paper labels for all text that sits at rest; paint label ink for text on colour.
- Bagel Fat One cut-out letters for shouted moments; Andika literacy text for everything that is read or edited.
- Two-step navy lift, die-cut paper rings on raised stickers, and an overshoot "pop" spring.
- A paper-plate wheel with a fluted rim and a taped paper flapper that ticks on every peg.
- Marimba, pop and tick sounds synthesised live, with mute in two places; reduced motion keeps every result readable.

## Colors

Saturated poster-paint primaries on sky-blue construction paper, with gold foil reserved for what has been earned and grape-navy ink for all text.

### Primary
- **Gold Foil** (#FFC21A): the material of earning. It is the mid-stop of the foil sticker gradient (#FFEB8A → #FFC21A → #F29B06 → #FFD54A → #F5A70C, drawn diagonally), the body of the claim pill and gold buttons, and the SPIN hub. The scene's sparks, the title's "w" and one scallop also use it, so the board always glints.
- **Foil Glint** (#FFE27A): the highlight of the gold radial (`radial-gradient(circle at 30% 25%, gold-hi, gold 55%)`) on the claim pill and gold buttons, and one of the scene squiggles.
- **Foil Ink** (#3A2200): label ink on every gold surface: claim pill text, gold button text and the hub's "SPIN" (9.2:1 on Gold Foil).

### Secondary
- **Grass Paper Green** (#23874A): the "go on" colour. Used for the default button (Done, Back to stars), the win card's "Good job" heading, the switch when on, and the plus badge on the star button. White text on it is 4.5:1.

### Tertiary
- **Poster Red** (#DC3B26): the danger and attention paper. Used for the New lesson button, the armed delete, the red count badge on a claim pill with several rewards waiting, the starter kid's strip, and the wheel flapper.
- **Poster Red Fold** (#A8291A): the shaded side of red. Used for the flapper's fold shadow, trash glyphs at rest, warning notes in the editor, and remove-photo text.

### Neutral
- **Construction-Paper Sky** (#2F7FE0): the board itself, always under the fibre texture. It is also the meta theme colour.
- **Bulletin Navy** (#0F3D86): the editor's voice. Used for drawer headings, add-button text, the dashed outlines of drop targets, and info notes.
- **Grape Ink** (#231C45): all body text, name tags, numerals and the 4px focus ring. It is a violet-navy, never black (15.9:1 on Paper White).
- **Faded Grape Ink** (#4B4570): secondary text such as card leads, hints, switch captions and the "or pick a picture" line (8.8:1 on white).
- **Paper White** (#FFFFFF): labels, tools, rails, cards, the paper plate, the die-cut sticker edge, clouds and the paper ring around raised stickers.
- **Cool Paper Wash** (#F2F6FC): recessed paper. Used for input fields, plain buttons, stepper discs, kbd caps and the drawer's close tool.
- **Sky Wash** (#EAF2FD): the hover and highlight for editor paper, the info-note background, and the drop-target fill.
- **Paper Crease** (#E2E8F3): a 2px inset crease on drawer rows, rule cards and switches, the popover ring, and the drawer footer's top border.
- **Sticky-Note Yellow** (#FFF27A): the first-run tip only. It is a real sticky note under fibre grain.
- **Masking Tape** (rgba(246,236,205,.9)): the torn tape on kid strips and the strip that holds the wheel flapper. It is translucent, so the paper shows through.
- **Notebook Margin Pink** (#F2A0A8) and **Notebook Rule Blue** (#CFE0F6): the editor drawer's notebook paper, with a 2px margin rule and a 2px ruled line every 37px.

### Paint Map
There are ten construction-paper paints (frontmatter `paint-*`). Each one is a set: **paper** (the strip, slice, chip or medal), **shade** (`-lo`: small glyphs on white, such as the gift on a "N more" label) and **label ink** (`-label`: any text or picture set on that paper). Red, Green, Blue and Purple take white label ink. Orange, Yellow, Lime, Teal, Sky and Pink take a deep ink in their own hue. Kids are given paints in a fixed order (red, green, purple, orange, blue, pink, teal, yellow), skipping any already in use. New prizes take the first unused paint. The rainbow, the scalloped border, the title letters, the wheel's rim dots and the confetti all draw from this same map, so the board reads as one pack of paper.

### Named Rules
**The Foil Is Earned Rule.** The foil gradient and the gold radial pill belong only to stars and the reward path: sticker stars, the star count, the star button's star, the claim pill, Claim reward, Spin again and the SPIN hub. Yellow paper (`paint-yellow`) is a different material. It is flat and has no radial highlight.

**The Paper Label Rule.** Text never sits bare on construction paper. On a kid strip, the name, count and "N more" label each sit on white paper. When text has to sit on paint (the spin tag, praise, wheel slice labels, prize pictures), it is set in that paint's own label ink.

**The Paint Set Rule.** A paint is always used as its full set: paper, shade and label ink. Never pair one paint's paper with another paint's ink.

## Typography

**Display Font:** Bagel Fat One (with Arial Rounded MT Bold, Trebuchet MS, system-ui)
**Body Font:** Andika (with Century Gothic, Trebuchet MS, system-ui)

Both faces are embedded as base64 (latin and latin-ext subsets) so the page renders offline.

**Character:** Bagel Fat One is fat, cut-out letters that look trimmed from paper with safety scissors. Andika is the SIL literacy face, with a single-storey a and g and generous spacing, so pre-readers and early readers can decode the names and prizes that matter to them.

### Hierarchy
- **Display** (Bagel 400, clamp(32px, 3.6vw, 52px), lh 1, +.01em; 30px at ≤520px): the "Rewards" title. Every letter is a separate cut-out in its own paint (red, orange, yellow, green, teal, purple, pink), with a tilt between −6deg and 6deg and a rise of 0–3px. Each letter has a 3px white die-cut outline, made from eight hard white text-shadows, plus a soft navy drop (0 6px 8px rgba(12,32,90,.35)). On hover, every letter mirrors its tilt and rises 3px.
- **Headline** (Bagel 400, clamp(32px, 4.4vw, 56px), lh 1.02, balanced wrap): card headings such as "Reward time!" and "Good job, NAME!". The win card's prize name uses the same face at clamp(30px, 4vw, 52px), lh 1.04.
- **Numeral** (Bagel 400, tabular): the star count beside its foil star. Size follows density: roomy clamp(54px, 6vw, 92px), compact clamp(34px, 3vw, 48px), tight clamp(28px, 2.4vw, 38px). The stepper value is 38px.
- **Praise** (Bagel 400, clamp(28px, 3vw, 48px)): "Good job, NAME!" pop-ups.
- **Title** (Bagel 400, clamp(28px, 3vw, 36px)): the drawer heading, in Bulletin Navy. The wheel's spin tag ("Mia's spin!") is clamp(22px, 2.4vw, 34px), lh 1.1.
- **Section** (Bagel 400, 24px, lh 1.1): drawer section heads, in Bulletin Navy.
- **Button** (Bagel 400, clamp(19px, 1.7vw, 23px); big clamp(22px, 2vw, 28px)): every paper button label. The claim pill is clamp(17px, 1.5vw, 22px). The hub is 5.6cqi, so it scales with the plate.
- **Lead** (Andika 700, clamp(18px, 1.8vw, 22px), lh 1.35, Faded Grape Ink with the kid's name bold in Grape Ink): card sentences.
- **Name tag** (Andika 700, clamp(18px, 1.5vw, 23px); roomy clamp(22px, 2.2vw, 34px), tight clamp(16px, 1.3vw, 20px)): kid names on strips, ellipsised in a single line.
- **Field** (Andika 700, 18px; 17px on phones): editor inputs and rule labels.
- **Label** (Andika 700, 17px): tool, add and photo buttons.
- **Body** (Andika 400, 16px, lh 1.45): editor hints and the keyboard list. The sticky-note tip uses Andika 700 at the same size, held to 44ch.
- **Label-sm** (Andika 700, 15px): the "N more" label and kbd caps. The popover's "or pick a picture" line is 14px.
- **Wheel slice labels** (Andika 700, 12–22px, auto-fit to the arc): set on an arc at radius 186, in the slice's label ink.

### Named Rules
**The Cut-Out Letter Rule.** Bagel Fat One is only used for short shouted words: the title, card headings, praise, numerals, button labels, the spin tag and SPIN. It is a single weight (400). Never set a sentence in it.

**The Literacy Text Rule.** Anything read or edited at rest is Andika: name tags, slice labels, fields, leads, hints and tips. It uses 700 for anything a child reads and 400 only for teacher-facing hints.

## Layout

The board is a centred column of kid strips on a fixed paper scene. The top bar holds the title on the left and white sticker tools on the right, padded clamp(22px, 3vh, 34px) at the top and by the gutter at the sides. The strip column is `min(100%, 1000px)` wide and centred both ways. Its bottom padding is clamp(30px, 6svh, 70px). Strips stack with a lane gap of clamp(18px, 3vh, 30px).

Layering, from back to front: scene (z 0), app (1), wheel stage (8), editor drawer (12), praise (15), confetti canvas (19), cards (20), and the scalloped border (30), which always frames everything.

**Density modes.** The strip column switches between three densities, chosen by head count: roomy for one or two kids, compact for three or four, tight for five to eight. On desktop it then steps down another level whenever the strips would overflow, so a class never scrolls if it can fit.
- *Roomy:* stars clamp(64px, 15vh, 128px), star button clamp(80px, 12vh, 108px), padding 24px 28px.
- *Compact (default):* grid "tag count actions" / "rail rail claim", stars clamp(44px, 7.4vh, 66px), star button clamp(56px, 7.6vh, 68px), padding 16px 20px.
- *Tight:* one row, "tag rail claim count actions", with the tag column at minmax(64px, 140px). Stars clamp(40px, 5.8vh, 60px), star button clamp(52px, 6.8vh, 64px), tape 58×20px, padding 12px 16px.

The "tag" area is a name row: the name label, then any won-reward gift stickers, with a 12px gap.

**Responsive.** The strips are a size container.
- At ≤600px, roomy restacks to "tag tag count" / "rail rail rail" / "claim actions actions".
- At ≤620px, tight returns to two rows.
- At ≤440px, every density uses the three-row stack, with stars sized in container units (clamp(34px, 12cqi, 74px)).
- Viewport ≥900px: the app is exactly one screen tall (100svh), strips scroll inside it, and the wheel can peek beside the editor.
- Below 900px, the page scrolls, tool labels collapse to icon-only 52px stickers, the rainbow, third cloud, squiggles and fourth spark are hidden, and peek is disabled.
- At ≤520px, the title is 30px, tools are 46px, the sun shrinks to 120px, and the notebook margin moves in to 28px, with content inset 40px.

**Spacing rhythm.** Small steps of 4, 8, 12, 16 and 24px, with 10px and 14px used inside controls. Strip padding and gaps scale with density, as above.

### Named Rules
**The One-Board Rule.** On desktop the whole lesson fits on one screen. Density steps from roomy to compact to tight before anything is allowed to scroll.

**The Scene Stays Back Rule.** The sun, clouds, rainbow, hills, sparks and squiggles are fixed, `aria-hidden` and pointer-transparent, and they are trimmed away before content ever shrinks.

## Elevation & Depth

This is a lifted system. Paper sits on paper, and the shadows fall as if daylight were landing on a blue board: always navy, soft, and slightly below. There are two lift steps. Pressing an element drops it one step. Overlays add a deep navy drop and a scrim of the same navy, so the board darkens like a room with the lights dimmed.

### Shadow Vocabulary
- **Lift-sm** (`box-shadow: 0 1px 2px rgba(12,32,90,.25), 0 5px 9px rgba(12,32,90,.25)`): labels and small stickers, including tools, name tags, gift stickers, count chips, "N more", add-kid, the tip, the undo disc and stepper discs.
- **Lift** (`box-shadow: 0 2px 3px rgba(12,32,90,.22), 0 10px 18px rgba(12,32,90,.28)`): strips, the star button, the claim pill, paper buttons, the spin tag, praise and the medal.
- **Press** (`box-shadow: 0 1px 2px rgba(12,32,90,.3)`, or one step down to Lift-sm): the active state of tools and the star button.
- **Die-cut ring** (`box-shadow: 0 0 0 4px #FFFFFF, <lift>`): the white paper edge around raised stickers on colour, used on the claim pill, paper buttons, spin tag and praise. The medal uses 8px plus a 10px faint ink ring. Paint and picture chips use 3px plus 4.5px rgba(35,28,69,.14) and 0 3px 5px rgba(12,24,70,.25).
- **Card frame** (`box-shadow: 0 0 0 12px <kid paint>, 0 0 0 14px rgba(0,0,0,.08), 0 26px 44px rgba(12,24,70,.5)`): claim and win cards, framed in the kid's own paper.
- **Drawer** (`box-shadow: 18px 0 40px rgba(12,24,70,.45)`): the notebook drawer.
- **Popover** (`box-shadow: 0 0 0 2px #E2E8F3, 0 16px 32px rgba(12,24,70,.35)`): the paint and picture pickers.
- **Wheel shadow**: a blurred navy disc (rgba(12,24,70,.45), blur 16px), offset down and right under the plate. The flapper uses drop-shadow(0 4px 4px rgba(12,24,70,.4)).
- **Sticker drop** (`filter: drop-shadow(0 2px 2px rgba(80,50,0,.35))`): a warm brown shadow under foil stars in the rail. This is the one warm shadow, because foil is the one warm material.
- **Tape** (`box-shadow: 0 1px 2px rgba(0,0,0,.15)`): torn tape edges.
- **Recess**: the rail uses an inset 2px rgba(35,28,69,.06) plus Lift-sm. Fields use `inset 0 2px 3px rgba(35,28,69,.12)`. Kbd caps use `inset 0 -3px 0 rgba(35,28,69,.15)`.
- **Scrims**: the wheel uses rgba(16,28,72,.62) and the claim prompt uses rgba(16,28,72,.55).

### Named Rules
**The Navy Daylight Rule.** Lift shadows are always navy-tinted (rgba(12,32,90,…) or rgba(12,24,70,…)). Neutral black only appears in hairline rings and tape edges.

**The Die-Cut Ring Rule.** Any sticker raised on colour gets a white paper ring before its lift. That ring is what makes it read as cut out, not printed.

## Shapes

Edges are cut round or torn, the way scissors and fingers leave them.
- **Radii:** a 2px sticky note, 6px name labels, 8px cards and spin tag, 10px rails and fields, 12px strips and chips, 14px drawer rows, 16px count chips and popovers, an 18px drawer spine, pills for tools, claims and buttons, and discs for the star button, undo, steppers, paint chips, the medal and the hub.
- **Torn tape:** two 78×26px pieces per strip (58×20px in tight), cut with a jagged 22-point clip-path, rotated −7deg and 6deg at the top corners and hanging 12px over the edge. The Reward time card uses the same torn shape at 96×30px, 18px in from its top corners, rotated −8deg and 7deg and hanging 24px over the edge.
- **Star stickers:** a ten-point star path with a 10px white round-join stroke (the die-cut edge) under a 3px foil stroke. A white four-point glint sits on the left arm. Each star has a face: two Grape Ink oval eyes with white catchlights, pink cheeks (#F0609E at 55%) and a small Grape Ink smile. The star on the star button wears the same face, without catchlights.
- **Gift stickers:** white paper discs, 1.75× the name-tag size, overlapping by 7px. Each holds a gift glyph in a paint (cycling red, purple, green, orange, blue, pink) with white knock-outs, and leans at a fixed tilt.
- **Crayon outlines:** empty slots draw the same star as two dashed strokes in the kid's paint: 3.2px dashed 6/4 at 75% opacity, plus 1.4px dashed 10/5 at 40%, offset 0.8px so it reads as a wobbly crayon line. Stickers land in each slot at a fixed tilt between −12deg and 12deg, so a full rail looks hand-stuck.
- **Scalloped border:** 11.5px circles at a 24px pitch along all four edges, in a repeating six-paint sequence 144px long.
- **Paper plate:** a white disc with a fluted rim (a 22px dashed ring, dashes 3.4/4, in #E4E8F0), two crease rings, slices with a 4px white seam and fibre grain, and a 66px white centre under the hub.
- **Flapper:** a red paper triangle with a white edge and a dark fold, taped to the top of the plate.

## Components

All components are tactile and sticky: thick paper, sticker edges, a spring when touched.

### Sticker Tools (top bar)
- **Shape:** white paper pills 52px tall with 0 20px 2px padding (Label type with a 24px glyph). Round variants are 52px discs. Below 900px every tool is icon-only, and at ≤520px tools are 46px.
- **Placement:** in the top bar the tools rest at alternating tilts (−2deg, then 1.5deg), like stickers pressed on by hand. The whole set hides while the wheel is up.
- **States:** hover lifts 2px and tilts −1.5deg (.15s pop). Press sinks 1px to the Press shadow. The 4px Grape Ink focus ring is offset 3px. The sound tool swaps its speaker glyph and `aria-pressed`. The full-screen tool swaps its glyph to match.

### Kid Strip (signature)
- **Body:** the kid's construction paper under fibre grain, 12px radius, with Lift. It is tilted −0.5deg, or 0.55deg on even strips, and taped at both top corners.
- **Name tag:** a white label at 6px radius, tilted −2deg, with Lift-sm and a 44px minimum height. Hover tilts it to 1deg and scales it to 1.03. Tapping it swaps in an inline input with a 3px ink inset ring; Enter saves and Escape cancels.
- **Won rewards:** round white gift stickers follow the name label, one per reward won this lesson. After four, a fifth sticker reads "+N" in Bagel at 0.8× the tag size, in Grape Ink. A newly won sticker spins in from scale 0 and −90deg (.7s pop). The group is a single image to assistive tech ("3 rewards won"). New lesson clears it.
- **Count chip:** white paper at 16px radius, tilted 1.5deg, holding a foil star and a Bagel numeral. The numeral bumps on every change.
- **Rail:** white paper with fibre grain, 10px radius and a recess, holding one slot per star in the goal (1–10; free spins shows 10). Empty slots are crayon outlines and filled slots are foil stickers.
- **Actions:** an undo disc (46px, a minus glyph, 50% opacity when nothing can be undone) and the **star button**, a white paper disc showing a smiling foil star with a green plus badge. The star button's hover is scale 1.06 and rotate −5deg. Its press is scale .93 with Lift-sm, and a keyboard press uses the same state.
- **Add a kid:** a white paper tile with a 3px dashed border at 35% ink, tilted −1.5deg, shown while fewer than three kids exist.
- **Sticky-note tip:** a yellow note tilted 1.2deg that explains the big star button and the keys. It is removed after the first star.

### Claim Pill and "N more" Label
- **Claim pill:** the gold radial with Foil Ink in Claim type, a 54px pill with a 4px paper ring and Lift, and a 28px gift glyph whose knock-outs are gold. When several rewards are waiting, a red badge at the top right (28px, Bagel 15px white, with a 3px paper ring) shows the count. At rest it does a 2.4s wiggle: still for 70% of the cycle, then a small shake. It pauses and scales to 1.06 on hover. In free-spins mode it reads "Spin!".
- **"N more" label:** 90% white paper at 10px radius with Lift-sm, Label-sm in Grape Ink, and a gift glyph in the kid's shade. Trying to claim too early shakes it sideways (.5s) and plays a low bonk.

### Paper Buttons
- **Shape:** pills, 58px tall with 0 26px 2px padding, in Button type with a 26px glyph. Each has a 4px paper ring plus Lift, or plain Lift when it sits inside a card.
- **Primary (Grass Paper Green, white):** Done, Back to stars.
- **Gold (gold radial, Foil Ink):** Claim reward, which is the big variant at 66px tall with 0 32px padding, and Spin again ("Spin again (N left)").
- **Plain (Cool Paper Wash, Grape Ink, Lift-sm):** Later, Use starter prizes.
- **Danger (Poster Red, white):** New lesson, at 52px and 19px type.
- **States:** hover lifts 2px and tilts −1.5deg. Press sinks 1px and scales to .97 (.14s pop). Destructive actions confirm twice: the first tap changes the label to "Tap again to…" for 3s.

### Claim Prompt Card
A white paper card with fibre grain, at 8px radius and min(560px, 100vw − 40px) wide, framed 12px in the kid's paint and taped at both top corners with masking tape. It sits over the .55 navy scrim. It holds "Reward time!" in Headline type, a row of tilted foil mini-stars (30–44px), the lead ("NAME got 5 stars. Good job!"), and the buttons Claim reward and Later. It flies in from scale .2 and −14deg to a −1deg rest (.7s pop), bursts 140 confetti pieces, and focuses Claim reward.

### Wheel Stage (paper-plate spinner)
- **Closed:** hidden, and not on the board.
- **Open:** a .62 navy scrim. The plate card scales in from .3 and −25deg (.6s pop). A spin tag sits above it ("Mia's spin!", in the kid's paint and label ink, 8px radius, tilted −2deg, with a paper ring and Lift). A round close tool sits at the top right. The plate is min(88vw, 70svh, 680px). The hub is a gold-radial disc 24% wide (#FFF3B8 → gold → #F2A007) with a white collar, reading "SPIN" in Foil Ink. When a spin is ready it breathes (scale 1.07, 1.6s). When disabled it is desaturated, and tapping it plays a bonk.
- **Won:** once the prize card appears, the plate card sinks away (to opacity 0, scale .8 and 40px down, .5s ease-out) and the close tool hides, so the win card hangs alone over the scrim. Spin again brings the plate back.
- **Toolbar:** the top-bar tools hide whenever the wheel is open.
- **Peek (desktop with the editor open):** the plate sits to the right of the drawer at min(40vw, 68svh, 600px), with no scrim, no tag and no close tool, and the hub disabled. It is a live preview that rebuilds as prizes are edited.
- **Slices:** paint paper with prize pictures in label ink. Picture details are knocked out in the slice's own paint. A photo prize shows its photo in a white-ringed circle. Rim dots cycle through the paint map.

### Win Card (hung on yarn)
The same paper card, shown on its own once the plate has sunk away. It is framed in the kid's paint and hung from two twisted red yarn strands (#E2475E / #B8233A, 4px), with pink plastic clips (#F0609E → #D9428A, 18×34px, tilted −4deg and 5deg). It holds "Good job, NAME!" in Headline type in Grass Paper Green, and a medal disc (clamp(110px, 17svh, 160px)) in the prize's paint with an 8px paper ring. The medal shows the prize picture in label ink, or a larger photo medal up to 240px. Below that come the prize name in Bagel and the buttons Spin again (gold) and Back to stars (primary).

### Editor Drawer (notebook paper)
- **Sheet:** notebook paper that slides in from the left (translateX(−106%) to 0, .48s ease-out). It has a pink margin rule at 52px, ruled blue lines every 37px that scroll with the content, an 18px rounded spine on the open edge, and the Drawer shadow. Content starts at the 66px inset, just right of the margin.
- **Head:** "Prizes & kids" in Title type, Bulletin Navy, with a round close tool on Cool Paper Wash. Sections use Section heads and Body hints in Faded Grape Ink.
- **Rows:** 94% white, 14px radius, with a 2px Paper Crease inset. Each row is a 44px paint chip, a 52px picture chip, a name field and a 44px delete button. Kid rows swap the picture chip for a mini-star count.
- **Fields:** Cool Paper Wash, 10px radius, inset recess, Field type, placeholder #6E6890. Enter commits the field, and an empty name restores the previous one.
- **Delete:** a transparent button with a red-fold trash glyph. On hover it gets a 10% red wash. When armed it fills Poster Red with a white glyph. It is disabled at the minimum count.
- **Add buttons:** 90% white, a 3px dashed Bulletin Navy border at 40%, 14px radius, 54px tall, and Label type in Bulletin Navy. Hover adds Sky Wash.
- **Star goal:** stepper discs (48px, Cool Paper Wash, Lift-sm) around a Bagel 38px value, with a preview row of mini foil stars, "=" and a red gift.
- **Switches:** a 62×36px track (off #C9D2E3, on Grass Paper Green) with a 28px white thumb that springs 26px (.25s pop). The focus ring sits on the track.
- **Drop targets:** a 4–5px dashed Bulletin Navy outline on Sky Wash.
- **Footer:** 96% white with a Paper Crease top border and a full-width Done button.

### Popovers (paint and picture pickers)
White paper at 16px radius with the Popover shadow and 12px padding, in a five-column grid. Paint chips are 44px discs in paint with fibre grain and a 3px paper ring. Picture chips are 52px at 12px radius, in paint, with the picture in label ink. The current choice carries a 4px Grape Ink outline. Arrow keys move around the grid. The picture picker leads with a full-width "Upload a photo" button and, once a photo is set, a "Remove photo" button in red fold on an 8% red wash.

### Praise Tag
"Good job, NAME!" (or "Good job!" when the name is longer than 12 characters), in Praise type on a random paint. The paint is never the previous one and never the kid's own. It has a 12px radius, a paper ring and Lift, and a random tilt of ±5deg. It appears above the kid's count chip, kept 160px from the viewport edges, then pops from .2 to 1.15, rises and fades over 1.4s ease-out. Under reduced motion it still appears, but in place: it fades in, holds and fades out over 1.6s with no movement.

### Motion Choreography
- **Curves:** pop `cubic-bezier(.34,1.56,.64,1)` (overshoot) for anything that sticks on, appears or is pressed. Ease-out `cubic-bezier(.16,1,.3,1)` for anything that slides or drifts.
- **Star drop** (.55s pop): a new sticker falls in from 80% above at 1.6× scale and −40deg, overshoots by 4deg, and settles at its slot tilt. The numeral bumps at the same time (.45s: 1.32×, −6deg).
- **Star hop** (.62s pop, staggered 70ms per star): when a strip fills, every sticker hops up 38% in turn, turning 20deg and scaling 1.18×. The prompt follows 950ms later.
- **Star blink:** every foil face blinks together every 5s (the eyes squash to 12% height for a moment).
- **Claim pop and wiggle:** a new claim pill scales in from 0 at −30deg (.7s pop), then wiggles every 2.4s.
- **Gift sticker in:** a newly won gift sticker spins in from scale 0 and −90deg (.7s pop) when the wheel lands.
- **Card pop-in:** cards fly in from .2 scale and −14deg to −1deg (.7s pop). The wheel card comes in from .3 scale and −25deg (.6s pop), and its scrim fades in over .4s.
- **Spin:** six full turns over 6–6.6s, eased `1 − (1 − t)^3.4`, landing at a random point 16–84% across the winning slice. Each peg crossing kicks the flapper back 9–30deg (more at higher speed). The kick decays by ×0.8 each frame, and each crossing plays a tick whose volume follows the speed. The winning slice then pulses brighter six times (.45s), and the win card follows 1.1s later while the plate sinks away (.5s ease-out).
- **Confetti** (canvas): pieces are five-point stars with a white edge, dots, chips and strips, in all ten paints plus gold (doubled) and white, falling with gravity and flutter. A burst falls from the top (170 pieces on a win, 140 for the prompt, 90 for the win card). A per-star pop fires upward from the new sticker (34 pieces, or 60 when the strip completes).
- **Ambient:** the sun's rays turn once a minute, the hub breathes when a spin is ready, and the title letters flip their tilt on hover.
- **Reduced motion:** all transitions and animations collapse to .01ms. The sun, wiggle, breathe and blink stop. Praise still shows, in place (1.6s fade in, hold, fade out). Confetti becomes still: scattered pieces that do not fall and fade out over about a second (up to 70 for a burst, 18 around a new star). The spin becomes one turn over 1.6s. The prompt and the win card appear after 250ms and 100ms. Every result stays visible and announced.

### Sound
All sound is synthesised live with Web Audio. It passes through a compressor (−14dB threshold, ratio 4) and a 0.7 master gain. The teacher can mute it from the sound tool or the drawer switch.
- **Marimba voice:** a sine fundamental plus a short 3.93× partial.
- **Pop:** a sine sweep from 380Hz to 1100Hz over 70ms.
- **Tick:** a 35ms burst of 3kHz band-passed noise.
- **Star:** a pop plus a marimba note that climbs a pentatonic ladder with each slot (C5 D5 E5 G5 A5 C6 …).
- **Earned:** an arpeggio of C5 E5 G5 C6 E6 G6, 80ms apart.
- **Undo:** G4 falling to E4.
- **Too early:** a low G3 bonk.
- **Wheel opens:** G4 C5 E5, 50ms apart.
- **Win:** a seven-note fanfare up to C7 over a C5/E5 chord.
- **Sound switched on:** a single G5.

## Do's and Don'ts

### Do:
- **Do** set text at rest on white paper. On paint, use only that paint's label ink (`paint-*-label`).
- **Do** give every sticker raised on colour a die-cut paper ring: 4px Paper White then Lift; 8px on the medal; 3px on chips.
- **Do** place paper by hand. Content pieces lean between −2deg and 2deg (strips ±0.5deg alternating, tags −2deg, count chips 1.5deg, cards −1deg). Tape may lean up to ±7deg and decoration up to ±22deg.
- **Do** use the crayon dashed outline for "not yet": empty star slots in the kid's paint, and dashed borders on add tiles and drop targets.
- **Do** spring things that stick on or appear with the pop curve (cubic-bezier(.34,1.56,.64,1)), and slide drawers and drifting pieces with ease-out (cubic-bezier(.16,1,.3,1)).
- **Do** lay the fibre texture over every construction-paper, sticky-note, card, rail, tape, paint-chip and medal surface. White labels and tools stay smooth.
- **Do** pair every state with a picture and a number (foil star plus count, gift plus "N more", prize picture plus name), so it reads without reading.
- **Do** pair every celebration with sound and confetti, and make sure the result still reads when both are off.
- **Do** keep touch targets at 44px or more (tools 52px, star button 52–108px, undo 46px, chips 44 and 52px).

### Don't:
- **Don't** put the wheel on the board at rest. It only comes out to claim a reward, or as the desktop peek beside the editor.
- **Don't** use pastel gradients or decorative UI gradients. A gradient here only renders a material: foil, the gold pill and hub, yarn twist, plastic clips, ruled lines, scallops or the plate sheen.
- **Don't** spend gold foil outside the earned path, and don't give yellow paper a foil highlight.
- **Don't** cast lift shadows in neutral black. Lift is navy.
- **Don't** set sentences, at-rest names or form text in Bagel Fat One, and don't set headings, numerals or button labels in Andika.
- **Don't** set white text on Poster Red (4.47:1) or Construction-Paper Sky (4.0:1) below Bagel button size. Use the fold shade or Grape Ink instead.
- **Don't** let decoration compete with strips. The scene stays fixed and pointer-transparent, and it is trimmed on small screens before content shrinks.
