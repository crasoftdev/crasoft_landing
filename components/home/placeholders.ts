// The design has two sections whose content doesn't exist yet: the "Trusted by"
// strip and the client story. They render as visible placeholders in `npm run dev`
// so the layout can be reviewed, and are left out of production builds, so no
// fake logos, numbers or quotes ever ship.
// TODO(content): real logos and metrics for Proof, and a real client story for
// CaseStudy. Then remove this switch from those two components.
export const showPlaceholders = process.env.NODE_ENV === "development";
