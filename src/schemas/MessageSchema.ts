const schema = {
    "type": "object",
    "properties": {
        "uuid": {
            "type": "number"
        },
        "user_uuid": {
            "type": "number"
        },
        "username": {
            "type": "string"
        },
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "avatar": {
            "type": "string"
        },
        "content": {
            "type": "string"
        },
        "timestamp": {
            "type": "string"
        }
    },
    "required": [
        "avatar",
        "content",
        "firstName",
        "lastName",
        "timestamp",
        "user_uuid",
        "username",
        "uuid"
    ]
} as const;
export default schema;