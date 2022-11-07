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
        },
        "liked_user_uuids": {
            "type": "array",
            "items": {
                "type": "number"
            }
        }
    },
    "required": [
        "avatar",
        "content",
        "firstName",
        "lastName",
        "liked_user_uuids",
        "timestamp",
        "user_uuid",
        "username",
        "uuid"
    ]
} as const;
export default schema;