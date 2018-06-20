#!/usr/bin/env groovy
@Library('demo-pipeline-library') _

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    parameters {
        string( name: 'CF_API',
                defaultValue: 'https://api.run.pivotal.io',
                description: 'Cloud Foundry API Endpoint')

        string( name: 'CF_ORG',
                defaultValue: 'azd-cidemo',
                description: 'PCF Organization')

        string( name: 'CF_SPACE',
                defaultValue: 'development',
                description: 'PCF Space')
    }

    tools {
        nodejs 'node-10'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Compile') {
            steps {
                sh 'npm run compile'
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    expression { isReleaseBranch() }
                    expression { isFeatureBranch() }
                }
            }

            steps {
                script {
                    String appName = isFeatureBranch()
                                ? appNameFromManifest(append: env.BRANCH_NAME)
                                : appNameFromManifest()

                    cfPush([
                        appName: appName,
                        apiUrl: params.CF_API,
                        org:    params.CF_ORG,
                        space:  params.CF_SPACE,
                        credentialsId: 'pcf'
                    ])
                }
            }
        }
    }
}
