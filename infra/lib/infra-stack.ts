import * as cdk from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, ContainerImage, FargateTaskDefinition } from 'aws-cdk-lib/aws-ecs';
import { Repository,  } from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { join } from 'path';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc',{
    })

    const fargateCluster = new Cluster(this, 'Infra-FargateCluster', {
      vpc: vpc,
      clusterName: 'Infra-FargateCluster'
    })
    
    const repository = new Repository(this, 'MyRepository', {
      repositoryName: 'infra-repo',      
    });
    repository.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY)

    const image = ContainerImage.fromAsset(join(process.cwd(), './docker-images/basic-express'), {
    });

    const taskDefinition = new FargateTaskDefinition(this, 'Basic-FargateTaskDefinition');

    taskDefinition.addContainer('basic-image', {
      image: image,
      portMappings:  [{
        containerPort: 3000,
        
      }]  
    });    

  }
}


/*
Tasks
Understand single nat gateway provider
*/
