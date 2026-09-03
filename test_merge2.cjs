const initial = { manualBadges: [1,2] };
const snap = { manualBadges: undefined };
console.log({ ...initial, ...snap });
