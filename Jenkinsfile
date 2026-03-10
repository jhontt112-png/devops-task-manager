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
                // We use 'main' as the branch to match your GitHub repository
                git branch: 'main', url: 'https://github.com/jhontt112-png/devops-task-manager.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
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
                // Builds both images using the environment variables defined above
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
                    // Logs into DockerHub and pushes both images
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $BACKEND_IMAGE'
                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Applies your Kubernetes manifest files located in the /k8s folder
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}