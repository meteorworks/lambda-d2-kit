module.exports = {
    region: process.env.REGION,
    handler: 'index.handler',
    role: process.env.IAM_ROLE,
    functionName: process.env.FUNC_NAME,
    timeout: 10
    // eventSource: {
    //  EventSourceArn: <event source such as kinesis ARN>,
    //  BatchSize: 200,
    //  StartingPosition: "TRIM_HORIZON"
    //}
}