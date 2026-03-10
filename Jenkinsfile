pipeline {
    agent any

    // This block ensures Jenkins uses the Node.js tool you configure in the UI
    tools {
        nodejs "node" 
    }

    environment {
        DOCKER_USER = "testin121"
        BACKEND_IMAGE = "${DOCKER_USER}/backend-app:latest"
        FRONTEND_IMAGE = "${DOCKER_USER}/frontend-app:latest"
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs() // Deletes old build files to prevent conflicts
            }
        }

        stage('Clone Repository') {
            steps {
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
                // Using the host's Docker engine via the socket we mounted
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
                // Ensure kubectl is configured on your Jenkins host
                sh 'kubectl apply -f k8s/'
            }
        }
    }
    
    post {
        always {
            echo 'Build Process Completed.'
        }
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Build Failed. Check the Console Output.'
        }
    }
}