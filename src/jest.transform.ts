import path from "path"

// Requried to fix Swiper CSS imports during jest executions, it transforms imports into filenames
export const mockCssSwiper = {
    process: (_src, filename) => `module.exports = ${JSON.stringify(path.basename(filename))};`
}
