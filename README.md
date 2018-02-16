# Lambda Dev and Deploy Kit

## コマンド実効権限の付与

コマンド実行用IAMに権限が必要
IAM User作成し、administrator access を与えた

## lambda 実行用IAM作成
```
# create trust_policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## 権限付与
```
aws-cli iam create-role \
 --role-name lambda_s3_exec_role \
 --assume-role-policy-document file://trust_policy.json
```


```
aws iam attach-role-policy \
 --role-name lambda_s3_exec_role
 --policy-arn arn:aws:iam::aws:policy/AWSLambdaExecute
```

## 関数作成
```
aws lambda create-function \
    --region ap-northeast-1
    --function-name myTestFunction
    --zip-file file://path/package.zip
    --role lambda_s3_exec_role
    --environment Variables="{LD_LIBRARY_PATH=/usr/bin/test/lib64}"
    --handler index.handler
    --runtime nodejs6.10
    --profile default
```

### for ALEXA
```npm i -S alexa-sdk```

Ref.
https://medium.com/@AdamRNeary/a-gulp-workflow-for-amazon-lambda-61c2afd723b6