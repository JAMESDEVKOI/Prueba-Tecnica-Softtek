


# Serverless Framework Node HTTP API on AWS

Reto Técnico - Backend NodeJS AWS :Softtek:

## Credentials

user:
```
 serverless-softtek
```
Password:
```
 James123
```
O sino me escribe para crearles un usuario y generarles el password

## Architecture

Aquitectura Hexagonal + Vertical Slicing + Screaming

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
 serverless deploy --verbose
```

After running deploy, you should see output similar to:

```
Deploying "Softtek-Prueba-Tecnica" to stage "dev" (us-east-2)
Uploading CloudFormation file to S3
Uploading State file to S3
Uploading service Softtek-Prueba-Tecnica.zip file to S3 (7.72 MB)
  UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - Softtek-Prueba-Tecnica-dev
  UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetPeoplesLambdaFunction
  UPDATE_COMPLETE - AWS::Lambda::Function - GetPeoplesLambdaFunction
  CREATE_IN_PROGRESS - AWS::Lambda::Version - GetPeoplesLambdaVersion4r0dUtceIanW5Aeu1EcLvu2QRVwo4zWTUZUAYEMnibc
  CREATE_IN_PROGRESS - AWS::Lambda::Version - GetPeoplesLambdaVersion4r0dUtceIanW5Aeu1EcLvu2QRVwo4zWTUZUAYEMnibc
  CREATE_COMPLETE - AWS::Lambda::Version - GetPeoplesLambdaVersion4r0dUtceIanW5Aeu1EcLvu2QRVwo4zWTUZUAYEMnibc
  UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - Softtek-Prueba-Tecnica-dev
  DELETE_SKIPPED - AWS::Lambda::Version - GetPeoplesLambdaVersionc6Wgquc2HABTODgSSABQCxcnJBeT6wlPoXKldoFI9lI
  UPDATE_COMPLETE - AWS::CloudFormation::Stack - Softtek-Prueba-Tecnica-dev
Removing old service artifacts from S3
✔ Service deployed to stack Softtek-Prueba-Tecnica-dev (39s)
endpoint: GET - https://kzlyr9uv6e.execute-api.us-east-2.amazonaws.com/people
functions:
  getPeoples: Softtek-Prueba-Tecnica-dev-getPeoples (7.7 MB)
Stack Outputs:
  GetPeoplesLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:481665110873:function:Softtek-Prueba-Tecnica-dev-getPeoples:9
  HttpApiId: kzlyr9uv6e
  ServerlessDeploymentBucketName: softtek-prueba-tecnica-de-serverlessdeploymentbuck-9p6el5xqgykv
  HttpApiUrl: https://kzlyr9uv6e.execute-api.us-east-2.amazonaws.com
  
```

### Test
Execute comand 
```
  npm run test
```
