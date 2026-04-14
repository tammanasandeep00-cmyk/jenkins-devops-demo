pipeline {
    agent { label 'agent' }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/YOUR_USERNAME/jenkins-devops-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f my-app-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 8081:80 --name my-app-container my-app'
            }
        }
    }
}
