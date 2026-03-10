pipeline {
    agent any

    environment {
        DOCKER_USER = "testin121"
<<<<<<< HEAD
    }

    stages {

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/backend-app ./backend'
            }
        }

        stage('Push Backend Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
=======
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
>>>>>>> c916fce630f56ffb900d828914d4df055832cc3c
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
<<<<<<< HEAD
                    sh 'docker push $DOCKER_USER/backend-app'
=======
                    sh 'docker push $BACKEND_IMAGE'
                    sh 'docker push $FRONTEND_IMAGE'
>>>>>>> c916fce630f56ffb900d828914d4df055832cc3c
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
<<<<<<< HEAD
=======
                // This requires kubectl to be installed and configured on your Jenkins agent
>>>>>>> c916fce630f56ffb900d828914d4df055832cc3c
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
