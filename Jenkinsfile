pipeline {
    agent any

    environment {
        DOCKER_USER = "testin121"
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
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $DOCKER_USER/backend-app'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
