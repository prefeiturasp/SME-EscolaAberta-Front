pipeline {
    agent {
      node { 
        label 'sme-nodes10'
	    }
    }
    
    options {
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()
      skipDefaultCheckout()  
    }
           
    stages {
        

       stage('CheckOut') {
        steps {
          checkout scm	
        }
       }
      
       stage('Testes') {
          steps {
                sh 'npm install'
                //sh 'npm run-script coverage'
                //sh 'npm run-script eslint'
                //sh 'npm run-script prettier'
                
                sh 'npm install -g jshint'
                sh 'jshint --verbose --reporter=checkstyle src > checkstyle-jshint.xml || exit 0'
                checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: '**/checkstyle-jshint.xml', unHealthy: ''
                
            }
        }
       
       stage('Analise codigo') {
          when {
              branch 'develop'
            }
            steps {
                sh 'sonar-scanner \
                    -Dsonar.projectKey=SME-EscolaAberta-Front \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://sonar.sme.prefeitura.sp.gov.br \
                    -Dsonar.login=7efb0af2fd6f7ebb6007b504a4657594d6b795b5'
            }
        }
      
       stage('Build DEV') {
         when {
           branch 'develop'
         }
        steps {
          sh 'echo build docker image desenvolvimento'
          
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "de1b36c4-9ea5-411e-bebf-14ddc1fbe9ea",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
           }
        }
       }        
       
       stage('Deploy DEV') {
         when {
           branch 'develop'
         }
        steps {
       
       
            
          sh 'echo Deploy ambiente desenvolvimento'
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "f6b5ed01-63a7-4a38-91ef-0095a54e7623",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        } 
       }
       
        
          
        stage('Build HOM') {
         when {
           branch 'homolog'
         }
        steps {  
           
         
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "16b0c59e-76e4-4684-ae23-9b14dd2b9783",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }

       stage('Deploy HOM') {
         when {
           branch 'homolog'
         }
        steps {
          timeout(time: 24, unit: "HOURS") {
          // telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
            input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'marcos_nastri, calvin_rossinhole, ollyver_ottoboni, kelwy_oliveira, pedro_walter, giuseppe_rosa'
          }
         sh 'echo Deploying ambiente homologacao'
                
          
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                             
              //JOB DE BUILD
              jobId: "a2513dc9-288c-4bde-8a6e-21cff0143e71",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }

        
        stage('Build PROD') {
         when {
           branch 'master'
         }
        steps {
        
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "fb557871-19a6-481c-911c-62ce2918a7fe",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
              //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }

       stage('Deploy PROD') {
         when {
           branch 'master'
         }
        steps {
          timeout(time: 24, unit: "HOURS") {
          // telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
            input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'marcos_nastri, calvin_rossinhole, ollyver_ottoboni, kelwy_oliveira, pedro_walter, giuseppe_rosa'
          }
            sh 'echo Build image docker Produção'
          
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                             
              //JOB DE DEPLOY
              jobId: "f6000ad2-6c6e-4ea4-af89-3f8a73a1e348",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }
    } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
    }
    success {
      telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n\n Uma nova versão da aplicação esta disponivel!!!")
    }
    unstable {
      telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
    failure {
      telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME}  - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
    changed {
      echo 'Things were different before...'
    }
    aborted {
      telegramSend("O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
  }
}
