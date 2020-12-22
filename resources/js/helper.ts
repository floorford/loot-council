export const ucFirst = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// player
// raid
export const formOptions = [
    {
        title: "Player",
        fields: [
            { label: "Name", id: "member" },
            { label: "Class", id: "class_id" },
            { label: "Role", id: "role_id" },
            { label: "Rank", id: "rank_id" }
        ]
    },
    {
        title: "Raid",
        fields: [{ label: "Name", id: "member" }]
    }
];
