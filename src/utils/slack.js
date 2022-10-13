export function getMdBlock(md) {
    return {
        "blocks": [
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": md
                    }
                ]
            }
        ]
    }
}