pipeline {
  agent any

  parameters {
    string(name: 'API_BASE_URL', defaultValue: 'http://localhost:3000', description: 'Base URL for the banking API')
    string(name: 'WEB_BASE_URL', defaultValue: 'http://localhost:4000', description: 'Base URL for the banking web app')
    string(name: 'BANK_API_USERNAME', defaultValue: '', description: 'Valid banking API username')
    password(name: 'BANK_API_PASSWORD', defaultValue: '', description: 'Valid banking API password')
    string(name: 'BANK_SOURCE_ACCOUNT_ID', defaultValue: '1', description: 'Source account ID for transfer tests')
    string(name: 'BANK_TARGET_ACCOUNT_ID', defaultValue: '2', description: 'Target account ID for transfer tests')
    string(name: 'BANK_TRANSFER_AMOUNT', defaultValue: '100', description: 'Transfer amount used by API tests')
    string(name: 'BANK_UI_TRANSFER_AMOUNT', defaultValue: '123.45', description: 'Transfer amount used by UI tests')
  }

  environment {
    API_BASE_URL = "${params.API_BASE_URL}"
    WEB_BASE_URL = "${params.WEB_BASE_URL}"
    BANK_API_USERNAME = "${params.BANK_API_USERNAME}"
    BANK_API_PASSWORD = "${params.BANK_API_PASSWORD}"
    BANK_SOURCE_ACCOUNT_ID = "${params.BANK_SOURCE_ACCOUNT_ID}"
    BANK_TARGET_ACCOUNT_ID = "${params.BANK_TARGET_ACCOUNT_ID}"
    BANK_TRANSFER_AMOUNT = "${params.BANK_TRANSFER_AMOUNT}"
    BANK_UI_TRANSFER_AMOUNT = "${params.BANK_UI_TRANSFER_AMOUNT}"
    HEADLESS = 'true'
  }

  stages {
    stage('Validate Parameters') {
      steps {
        script {
          if (!env.BANK_API_USERNAME?.trim()) {
            error('BANK_API_USERNAME must be configured in Jenkins before running the tests.')
          }

          if (!env.BANK_API_PASSWORD?.trim()) {
            error('BANK_API_PASSWORD must be configured in Jenkins before running the tests.')
          }
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        script {
          runCommand('npm ci')
        }
      }
    }

    stage('Install Playwright Browser') {
      steps {
        script {
          runCommand('npx playwright install chromium')
        }
      }
    }

    stage('Run Regression Tests') {
      steps {
        script {
          runCommand('npm run test:report')
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/**/*.html', allowEmptyArchive: true
    }
  }
}

void runCommand(String command) {
  if (isUnix()) {
    sh command
  } else {
    bat command
  }
}
