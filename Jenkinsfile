pipeline {
    agent any

    environment {
        DOCKER_USER = "testin121"
        BACKEND_IMAGE = "${DOCKER_USER}/backend-app:latest"
        FRONTEND_IMAGE = "${DOCKER_USER}/frontend-app:latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Specified 'main' branch to avoid the "Couldn't find revision" error
                git branch: 'main', url: 'https://github.com/jhontt112-png/devops-task-manager.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    // Using --quiet to keep Jenkins logs clean
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // Ensure the path to the Dockerfile is correct relative to the root
                sh 'docker build -t $BACKEND_IMAGE ./backend'
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub', 
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $BACKEND_IMAGE'
                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // This requires kubectl to be installed and configured on your Jenkins agent
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
