import * as Haptics from "expo-haptics";

export const triggerHapticFeedback = (
  style: keyof typeof Haptics.ImpactFeedbackStyle = "Light"
) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style]);
};

// Calculating angle based on X and Y drag (in radians)
export const calculateAngle = (x: number, y: number) => {
  const _radians = Math.atan2(y, x);
  const _degrees = _radians * (180 / Math.PI); // Convert to degrees
  const adjusted = _degrees + 90; // Adjusted
  const normalized = adjusted % 45; // Normalize by 45deg
  return normalized; // Invert the angle for more realistic gesture
};
