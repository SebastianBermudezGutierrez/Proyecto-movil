pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        DATABASE_URL = env("DATABASE_URL") 
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                nodejs(nodeJSInstallationName: "node-${NODE_VERSION}") {
                    sh 'node --version'
                    sh 'npm install -g @nestjs/cli'
                    sh 'npm install'
                }
            }
        }

        // Nueva etapa para limpiar la base de datos
        stage('Reset Database') {
            steps {
                script {
                    // Primero instalamos Prisma CLI si no está instalado
                    sh 'npm install -g prisma'
                    
                    // Luego ejecutamos el comando para resetear la base de datos
                    sh 'npx prisma migrate reset --force --skip-seed'
                    
                    // Opcional: Si necesitas ejecutar migraciones específicas
                    // sh 'npx prisma migrate deploy'
                }
            }
        }
        
        stage('Linting') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}