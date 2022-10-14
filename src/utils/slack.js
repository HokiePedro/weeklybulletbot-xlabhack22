export function getMdBlock(md) {
    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": md
                }
            }
        ]
    }
}