const schedules = [
  {
    name: "5 days a week",
    days: [
      {
        name: "Day A",
        exerciseCount: 6
      },
      {
        name: "Day B",
        exerciseCount: 6
      },
      {
        name: "Day C",
        exerciseCount: 6
      }
    ],
    rules: [
      {
        name: "Two muscles groups a day.",
        fn: (exercise, day) => {
          return [...day.exercises, exercise].reduce((set, dayExercise) => {
            if (!dayExercise.name) return set;

            set.add(dayExercise.target);

            return set
          }, new Set()).size > 2
        }
      },
      {
        name: "Two compound movements max.",
        fn: (exercise, day) => {
          return [...day.exercises, exercise].filter((dayExercise) => dayExercise.compound).length > 2
        }
      }
    ]
  },
  {
    name: "4 days a week",
    days: [
      {
        name: "Day A",
        exerciseCount: 5
      },
      {
        name: "Day B",
        exerciseCount: 5
      }
    ],
    rules: [
      {
        name: "One compound movement per muscle group.",
        fn: (exercise, day) => {
          return day.exercises.some((dayExercise) => {
            return dayExercise.compound && exercise.compound && dayExercise.target === exercise.target
          });
        }
      },
      {
        name: "Two compound movements max.",
        fn: (exercise, day) => {
          return [...day.exercises, exercise].filter((dayExercise) => dayExercise.compound).length > 2
        }
      },
      {
        name: "No conflicting muscle groups between compounds.",
        fn: (exercise, day) => {
          const conflicts = [
            ["chest", "back"],
            ["arms", "core"]
          ];

          const muscles = [...day.exercises, exercise].map((e) => e.target);

          return conflicts.some((conflict) => {
            return conflict.every((muscle) => muscles.includes(muscle));
          });
        }
      }
    ]
  },
  {
    name: "3 days a week",
    days: [
      {
        name: "Day A",
        exerciseCount: 5
      },
      {
        name: "Day B",
        exerciseCount: 5
      }
    ],
    rules: [
      {
        name: "One compound movement per muscle group.",
        fn: (exercise, day) => {
          return day.exercises.some((dayExercise) => {
            return dayExercise.compound && exercise.compound && dayExercise.target === exercise.target
          });
        }
      },
      {
        name: "Three compound movements max.",
        fn: (exercise, day) => {
          return [...day.exercises, exercise].filter((dayExercise) => dayExercise.compound).length > 3
        }
      },
      {
        name: "No conflicting muscle groups between compounds.",
        fn: (exercise, day) => {
          const conflicts = [
            ["chest", "back"],
            ["arms", "core"]
          ];

          const muscles = [...day.exercises, exercise].map((e) => e.target);

          return conflicts.some((conflict) => {
            return conflict.every((muscle) => muscles.includes(muscle));
          });
        }
      }
    ]
  }
];

export default schedules;
