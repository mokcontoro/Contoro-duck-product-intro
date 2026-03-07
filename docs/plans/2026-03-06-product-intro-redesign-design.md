# Design: Repurpose Training Site → Product Introduction

**Date:** 2026-03-06
**Repo:** mokcontoro/Contoro-duck-product-intro
**Approach:** Minimal Rewrite (edit in place)

## Goal

Transform the operator training site into a product introduction presentation for the Contoro Duck Unloading Robot, targeting investors and customers.

## Audience

Both investors and customers equally, via a single slide-based presentation.

## Format

Fullscreen slide presentation (based on existing `training.html`). No separate landing page.

## Slide Sequence (~30 slides)

| # | Title | Source Slide | Notes |
|---|-------|-------------|-------|
| 1 | Welcome / Product Title | 1 | Rebrand from "Duck Camp / Level I Certification" to product intro |
| 2 | Our Technology | 4 | Minor copy polish |
| 3 | What Do We Do? | 5 | Keep as-is |
| 4 | Why This Matters | 6 | Keep — injury reduction + hot/cold containers |
| 5 | Automated Unloading in Action | 7 | Overview video |
| 6 | Operating Limits | 8 | Keep specs table |
| 7 | Trailers & Containers | 9 | Keep in-scope / out-of-scope |
| 8 | Site Requirements | 10 | Keep |
| 9 | Real-Life Unloading Scene | 14 | Keep image |
| 10 | Real-Life Unloading | 15 | Keep video |
| 11 | How the Box Moves | 16 | Keep conveyor flow steps |
| 12 | Box Conveyor Path | 17 | Keep video |
| 13 | Gripper in Action | 19 | Keep video only |
| 14 | Safety Overview | 25 | Reframe as product strength |
| 15 | Safety Features | 26 | Reframe as product capabilities |
| 16 | Status Indicator Light | 27 | Keep video |
| 17 | Industrial-Grade Safety | 28 | Reframe high voltage + arm as safety design |
| 18 | Smart Incident Handling | 30 | Reframe edge case handling |
| 19 | Robot Status Modes | 37 | Reframe as 4-state operational awareness |
| 20 | Manual Driving | 38 | Keep — Xbox controller detail |
| 21 | Manual Driving Demo | 39 | Keep video |
| 22 | Quick Deployment | 44 | Reframe setup as ease of deployment |
| 23 | Setup Demo | 45 | Keep video |
| 24 | Easy Teardown | 46 | Reframe teardown |
| 25 | Cloud Control Interface | 49 | Reframe UI as product feature |
| 26 | UI Capabilities | 50 | Keep table |
| 27 | Monitoring & 3D Visualization | 51 | Reframe health + portal |
| 28 | Built-in Incident Tracking | 52 | Reframe incident reporting |
| 29 | Simple 6-Step Operation | 54 | Reframe workflow |
| 30 | Fail-Safe Operation | 55 | Reframe E-stop as safety feature |

## Content Removed

- All 16 quiz questions (4 quizzes)
- All 3 live exercise slides
- Completion/results slide
- Training plan slide
- Excluded detail slides:
  - System Components Overview
  - Duck / Unloading Robot (component detail)
  - Safety Fence (component detail)
  - Safety Cart (component detail)
  - Gripper / End Effector (component detail)
  - KUKA Robotic Arm (component detail)
  - Flex (Skate) Conveyor (component detail)
  - KUKA Robotic Arm Safety
  - The 6 E-Stops

## Files to Modify

| File | Action |
|------|--------|
| `training.html` | Remove excluded slides, quizzes, exercises, completion. Rewrite copy. |
| `js/training.js` | Strip quiz logic, scoring, results. Keep slide nav + keyboard controls. |
| `training.css` | Remove quiz/exercise styles (cleanup). |
| `index.html` | Replace with redirect to `training.html`. |
| `README.md` | Rewrite for product intro purpose. |

## Files Unchanged

- All `assets/images/` and `assets/videos/` — no changes
- `css/style.css` — becomes unused (kept for reference)
- `js/script.js` — becomes unused (kept for reference)

## Language Reframing

- Remove: "operator", "certification", "training", "trainee", "course", "quiz", "exercise"
- Replace with: "product", "solution", "capability", "feature", "designed for"
- Safety sections → product strengths ("built with safety at the core")
- Setup/teardown → ease of deployment ("quick setup", "easy teardown")
- Operation procedures → simple workflow ("6-step operation")

## No New Content

No new slides, CTAs, or business case content added. Purely reframing existing material.
