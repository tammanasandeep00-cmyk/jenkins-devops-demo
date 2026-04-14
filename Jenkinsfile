pipeline {
    agent any

    environment {
        ECR_REPO = "212295302817.dkr.ecr.us-east-1.amazonaws.com/my-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        REGION = "us-east-1"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/tammanasandeep00-cmyk/jenkins-devops-demo.git'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $ECR_REPO:$IMAGE_TAG .'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $REGION | \
                docker login --username AWS --password-stdin $ECR_REPO
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $ECR_REPO:$IMAGE_TAG'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f my-app-container || true
                docker run -d -p 8081:80 --name my-app-container $ECR_REPO:$IMAGE_TAG
                '''
            }
        }
    }
}
