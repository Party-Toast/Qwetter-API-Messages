const schema = {
    "type": "object",
    "properties": {
        "user_uuid": {
            "type": "number"
        }
    },
    "required": [
        "user_uuid"
    ]
} as const;
export default schema;