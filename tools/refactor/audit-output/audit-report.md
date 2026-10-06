# Refactor audit

Generated 2026-10-06 08:49 UTC.

## Headline

**Code quality score 63.8%.** **43 of 117 source files are over the 100-line limit (36.8%)**; the worst file is 1,048 lines.

## Code quality score

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **49.7%** | **52** | |
| Files over the line limit | 43 in 117 files | 26.5% | 10 | 50% of files |
| Worst file, in limits over | 9.48 | 0.0% | 5 | 9 |
| Functions over the line limit | 11 in 171 functions | 74.3% | 8 | 25% of functions |
| Else blocks | 10 in 359 branches | 94.4% | 5 | 50% of branches |
| Duplication % | not measured | not measured | — | 20 |
| Explanatory comment lines | 148 in 15.49 thousand lines | 80.9% | 4 | 50 per thousand lines |
| Inline magic values | 277 in 15.49 thousand lines | 10.6% | 4 | 20 per thousand lines |
| Orphan components and functions | 11 in 195 components and functions | 43.6% | 4 | 10% of components and functions |
| Long member chain lines | 101 in 15.49 thousand lines | 78.3% | 4 | 30 per thousand lines |
| Deeply indented lines | 727 in 15.49 thousand lines | 0.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 171 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **100.0%** | **10** | |
| Files the patterns predict but are missing | 0 in 26 predicted files | 100.0% | 10 | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **82.2%** | **20** | |
| Conditions with calls tangled inside calls | 10 in 359 branches | 88.9% | 8 | 25% of branches |
| Conditions compared to a raw literal | 40 in 359 branches | 55.4% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 171 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

## The repository by area

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| frontend | 172 | 57 | 11,215 |
| backend | 34 | 34 | 2,407 |
| shared | 19 | 18 | 1,558 |
| docs | 10 | 0 | 0 |
| api | 8 | 8 | 307 |
| infrastructure | 8 | 0 | 0 |
| database | 7 | 0 | 0 |
| other | 2 | 0 | 0 |
| **whole repository** | **260** | **117** | **15,487** |

## Summary

| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 43, totalFiles: 117, totalLines: 15487, worstFileLines: 1048, worstFileTimesOverLimit: 9.48 |
| functionShape | limit: 30, functionsOverLimit: 11, totalFunctions: 171, elseBlocks: 10, ifBlocks: 359, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | skipped: jscpd is not installed (npm install -g jscpd) |
| naming | bannedAbbreviationHits: 156, unprefixedBooleans: 37 |
| comments | explanatoryCommentLines: 148, filesWithComments: 44, taskMarkers: 0 |
| magicValues | inlineHexColours: 244, inlineStyleAttributes: 3, repeatedStringLiterals: 30 |
| prose | longMemberChainLines: 101, deeplyIndentedLines: 727, overlongLines: 101, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 10, literalComparisonLines: 40, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 171 |
| designPatterns | roleFamilies: 4, predictedFiles: 26, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 30, components: 24, orphanComponents: 11, averagePageLines: 284 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 9, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 260, frontend: 172, backend: 34, shared: 19, docs: 10, api: 8, infrastructure: 8, database: 7, other: 2 |

## Against the baseline

No `baseline.json` beside the audit — nothing to ratchet against.

## Worst files by length

| File | Lines |
| --- | --- |
| src/routes/demo/+page.svelte | 1048 |
| src/routes/rtw/+page.svelte | 1011 |
| src/routes/admin/brochure/[id]/page/[pageId]/+page.svelte | 671 |
| src/routes/admin/enquiries/+page.svelte | 480 |
| src/routes/subcontractor-terms/+page.svelte | 463 |
| src/routes/admin/+page.svelte | 439 |
| src/routes/admin/projects/[id]/+page.svelte | 383 |
| src/routes/admin/brochure/[id]/+page.svelte | 378 |
| src/lib/content/pages.ts | 334 |
| src/lib/brochure/defaults.ts | 326 |
| src/routes/admin/brochure/+page.svelte | 310 |
| src/lib/brochure/templates.ts | 308 |
| src/lib/server/db.ts | 301 |
| src/lib/server/brochures.ts | 300 |
| src/routes/admin/content/[page]/+page.svelte | 300 |
| src/routes/admin/badges/+page.svelte | 298 |
| src/routes/admin/slideshow/+page.svelte | 288 |
| src/lib/data/projects.ts | 269 |
| src/routes/admin/rtw/+page.svelte | 249 |
| src/lib/components/admin/ImagePicker.svelte | 243 |

Full detail, including every offender list, is in `audit.json`.
