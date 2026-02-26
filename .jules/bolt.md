# Bolt's Journal - Critical Learnings

## 2024-05-22 - Memory Leak in Animation Loops
**Learning:** React's `useEffect` cleanup function is critical for `requestAnimationFrame` loops. Failing to cancel the animation frame ID results in the loop continuing to run in the background even after the component unmounts, consuming CPU and potentially causing memory leaks if it references unmounted state.
**Action:** Always capture the `requestAnimationFrame` ID and call `cancelAnimationFrame` in the `useEffect` cleanup return.
