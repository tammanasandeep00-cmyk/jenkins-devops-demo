pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        ECR_REPO = "212295302817.dkr.ecr.us-east-1.amazonaws.com/my-app"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/tammanasandeep00-cmyk/jenkins-devops-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app .'
            }
        }

        stage('Tag Image for ECR') {
            steps {
                sh '''
                docker tag my-app:latest $ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $ECR_REPO
                '''
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                docker push $ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f my-app-container || true
                docker run -d -p 8081:80 --name my-app-container $ECR_REPO:$IMAGE_TAG
                '''
            }
        }
    }
}
