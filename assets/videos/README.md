# Video placeholder directory

Put the final web-ready videos here. Recommended delivery format:

- MP4, H.264, `yuv420p`
- 1920×1080 or 1280×720
- `-movflags +faststart`
- muted preview clips should be kept below roughly 15 MB each when possible

## Cover video wall

The cover uses `hero-01.mp4` through `hero-24.mp4` in a 6-column × 4-row grid. The current files are lightweight placeholders generated from `/home/dell/视频`.

To replace the cover without editing HTML, export the final clips with the same filenames. The page expects muted, looping videos and crops them to each cell with `object-fit: cover`.

On medium screens the first 16 clips are shown in a 4 × 4 grid. On phones the first 12 are shown in a 3 × 4 grid.

## Demonstration section

The four placeholder topics currently used by the lower demonstration section are:

1. Human avatar synthesis
2. Cross-embodiment retargeting
3. Domain-randomized generation
4. Real humanoid deployment

These names and the number of cards can be changed when the recordings arrive.
