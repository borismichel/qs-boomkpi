export const definition = {
    type: "items",
    component: "accordion",
    items: {
        measure: {
            uses: "measures",
            min: 1,
            max: 1,
        },
        sorting: {
            uses: "sorting",
        },
        appearance: {
            uses: "settings",
        },
    },
};