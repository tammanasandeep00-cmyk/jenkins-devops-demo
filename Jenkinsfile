pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "212295302817"
        ECR_REPO = "212295302817.dkr.ecr.us-east-1.amazonaws.com/my-app"
        ECR_REGISTRY = "212295302817.dkr.ecr.us-east-1.amazonaws.com"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app .'
            }
        }

        stage('Tag Image for ECR') {
            steps {
                sh 'docker tag my-app:latest $ECR_REPO:$IMAGE_TAG'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Push to ECR') {
            steps {
                sh 'docker push $ECR_REPO:$IMAGE_TAG'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f my-app-container || true
                docker run -d -p 8081:3000 --name my-app-container $ECR_REPO:$IMAGE_TAG
                '''
            }
        }
    }
}
