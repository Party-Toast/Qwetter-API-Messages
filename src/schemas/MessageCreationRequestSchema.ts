const schema = {
    "type": "object",
    "properties": {
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
            "type": "string"
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
        "username"
    ]
} as const;
export default schema;