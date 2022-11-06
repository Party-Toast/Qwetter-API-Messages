const schema = {
    "type": "object",
    "properties": {
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
        "bio": {
            "type": "string"
        },
        "location": {
            "type": "string"
        },
        "website": {
            "type": "string"
        }
    },
    "required": [
        "avatar",
        "bio",
        "firstName",
        "lastName",
        "location",
        "username",
        "website"
    ]
} as const;
export default schema;