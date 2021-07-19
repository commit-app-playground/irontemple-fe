const exercises = [
  { name: "Barbell Squat", target: ["legs"], compound: true },
  { name: "Deadlift", target: ["legs"], compound: true },
  { name: "Bench Press", target: ["chest"], compound: true },
  { name: "Chest dip", target: ["chest"], compound: true },
  { name: "Shoulder Press", target: ["shoulder"], compound: true },
  { name: "Barbell Row", target: ["back"], compound: true },
  { name: "Pull-up", target: ["back"], compound: true },
  { name: "Lunge", target: ["legs"] },
  { name: "Leg Press", target: ["legs"] },
  { name: "Leg raise", target: ["legs"] },
  { name: "Leg curl", target: ["legs"] },
  { name: "Dumbbell Flies", target: ["chest"] },
  { name: "Upright Row", target: ["shoulder"] },
  { name: "Lateral raise", target: ["shoulder"] },
  { name: "Front raise", target: ["shoulder"] },
  { name: "Seated row", target: ["back"] },
  { name: "Cable pulldown", target: ["back"] },
  { name: "Triceps extension", target: ["arms"] },
  { name: "Dumbbell curl", target: ["arms"] },
  { name: "Situps", target: ["core"] },
  { name: "Hip raise", target: ["core"] },
  { name: "Plank", target: ["core"] }
];

const grouped = exercises.reduce((all, exercise) => {
  exercise.target.forEach((target) => {
    all[target] = all[target] || [];

    all[target].push(exercise);
  })

  return all;
}, {});

export default {
  grouped,
  catalog: exercises
}
