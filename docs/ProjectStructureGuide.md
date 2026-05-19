# Project Structure Guide

## Complete Project Organization

```
SaaSPrototype/
│
├── 📄 README.md                    # Project overview
├── 📄 requirements.txt             # Dependencies documentation
├── 📄 .env.example                 # Environment template
├── 📄 run_instructions.md          # Setup & running guide
│
├── 📁 source_code/
│   ├── 📁 backend/
│   │   ├── app/
│   │   │   ├── main.js            # Express server entry point
│   │   │   ├── controllers/       # API request handlers
│   │   │   ├── services/          # Business logic
│   │   │   ├── models/            # Database schemas
│   │   │   ├── repositories/      # Data access layer
│   │   │   ├── database/          # DB connection
│   │   │   └── config/            # Configuration
│   │   ├── package.json
│   │   └── .env.example
│   │
│   ├── 📁 frontend/               # React application
│   │   ├── src/
│   │   │   ├── views/             # Page components
│   │   │   ├── components/        # Reusable components
│   │   │   ├── services/          # API client
│   │   │   ├── __tests__/         # Component tests
│   │   │   └── styles/
│   │   └── package.json
│   │
│   └── 📁 shared/
│       ├── api_contracts/         # OpenAPI specs
│       └── sample_data/           # Test data
│
├── 📁 test_code/
│   ├── bdd_features/              # Gherkin feature files
│   ├── bdd_step_definitions/      # BDD step implementations
│   ├── unit_tests/                # Service unit tests
│   ├── api_tests/                 # API endpoint tests
│   └── conftest.js                # Test configuration
│
├── 📁 docs/
│   ├── ArchitectureDescription.md # System architecture
│   ├── ImplementationSummary.md   # Implementation details
│   ├── UserStories.md             # User requirements
│   ├── AcceptanceCriteria.md      # Test criteria
│   ├── AcceptanceTests_BDD.md     # BDD approach
│   ├── UnitTests_TDD.md           # TDD approach
│   ├── FunctionalTests.md         # Functional testing
│   ├── APIDocumentation.md        # API reference
│   ├── TraceabilitySummary.md     # Requirements tracing
│   └── DeploymentInfo.md          # Deployment guide
│
├── 📁 test_results/
│   ├── test_results_summary.md    # Test execution results
│   ├── coverage_report/           # Code coverage
│   └── pytest_full_output.txt     # Raw test output
│
├── 📁 screenshots/
│   ├── app_running.png
│   ├── swagger_api_docs.png
│   ├── bdd_tests_passed.png
│   ├── tdd_tests_passed.png
│   └── important_feature_screenshots/
│
└── 📁 deployment/
    ├── Dockerfile                 # Backend container
    ├── Dockerfile.frontend        # Frontend container
    ├── docker-compose.yml         # Multi-container setup
    ├── deployment_notes.md        # Deployment guide
    ├── sample_api_requests.http   # API test requests
    └── README.md                  # Deployment info
```

## Key Directories Explained

### source_code/backend/app/
- **controllers/**: Handle HTTP requests → responses
- **services/**: Implement business logic
- **repositories/**: Abstract database operations
- **models/**: Define data schema
- **database/**: MongoDB connection
- **config/**: Application settings

### source_code/frontend/
- **views/**: Full page components
- **components/**: Reusable UI components
- **services/**: API client functions
- **__tests__/**: Component unit tests

### test_code/
- **bdd_features/**: User story scenarios (.feature files)
- **bdd_step_definitions/**: Test step implementations
- **unit_tests/**: Service & business logic tests
- **api_tests/**: REST API endpoint tests

### docs/
- Architecture and design decisions
- User stories and requirements
- Test strategies and results
- API documentation
- Deployment procedures

### deployment/
- Docker configurations
- Deployment scripts
- Sample API requests
- Deployment notes

---

## Navigation Guide

### For Developers
1. Start with: `README.md`
2. Setup: `run_instructions.md`
3. Code: `source_code/backend/` or `source_code/frontend/`
4. Tests: `test_code/`

### For Testers
1. Features: `test_code/bdd_features/`
2. Test Cases: `test_code/unit_tests/` & `test_code/api_tests/`
3. Results: `test_results/`

### For Deployment
1. Guide: `docs/DeploymentInfo.md`
2. Docker: `deployment/docker-compose.yml`
3. Config: `deployment/deployment_notes.md`

### For Documentation
1. Overview: `docs/ArchitectureDescription.md`
2. Requirements: `docs/UserStories.md`
3. API: `docs/APIDocumentation.md`
4. Tests: `docs/AcceptanceTests_BDD.md`

---

## File Naming Conventions

- **Controllers**: `*_controller.js`
- **Services**: `*_service.js`
- **Models**: `*.js` (singular name)
- **Repositories**: `*_repository.js`
- **Tests**: `test_*.js` or `*.test.js`
- **Features**: `*.feature`

---

Last Updated: 2026-05-17
