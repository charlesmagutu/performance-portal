# Features
#### System Under Test module:
- View a list of systems under test.
- Add a new system under test.
- Edit existing systems.
- Delete systems.
- View details of a specific system.
- Search and filter systems.

#### Deployment Environment module:
- View a list of deployment environments.
- Add a new deployment environment.
- Edit existing environments.
- Delete environments.
- View details of a specific environment.
- Search and filter environments.

#### Test Type module:
- View a list of test types.
- Add a new test type.
- Edit existing test types.
- Delete test types.
- View details of a specific test type.
- Search and filter test types.

#### Target module:
- View a list of targets.
- Add a new target.
- Edit existing targets.
- Delete targets.
- View details of a specific target.
- Search and filter targets

#### Benchmark Result module:
- View benchmark results for different systems and environments.
- Filter and sort benchmark results.
- View detailed metrics for each benchmark.
- Search benchmark results.

#### Test Configuration module:
- Create and manage test configurations.
- Associate test configurations with systems, environments, and targets.
- Define parameters for tests (script path, data path, etc.).
- View and edit existing test configurations.
- Delete test configurations.
- Search and filter test configurations.

#### Test Result module:
- View test results for different configurations, systems, and targets.
- Analyze test metrics (response time, throughput, CPU utilization, etc.).
- Filter and sort test results.
- View detailed reports for each test result.
- Search test results.

#### Scheduled Test module:
- Schedule tests for automation.
- Set recurrence patterns for scheduled tests.
- View and manage scheduled tests.
- Cancel or reschedule tests.
- Search scheduled tests.
#### Test Report module:
- Generate reports based on test results.
- Choose report formats (PDF, CSV, etc.).
- Distribute reports to specified recipients.
- View and download generated reports.
- Search and filter reports.
 
# Database Schemas

### SQL

#### system_tb 

```sql

CREATE TABLE SystemUnderTest_tb (
    SystemUnderTestId BIGINT PRIMARY KEY AUTO_INCREMENT,
    SystemName VARCHAR(255) NOT NULL,
    SystemDescription TEXT,
    SystemVersion VARCHAR(50),
    SystemType VARCHAR(50),
    DeploymentEnvironmentId BIGINT,
    FOREIGN KEY (DeploymentEnvironmentId) REFERENCES DeploymentEnvironment(DeploymentEnvironmentId)
);
```

##### DeploymentEnvironment_tbl

```sql
CREATE TABLE DeploymentEnvironment (
    DeploymentEnvironmentId BIGINT PRIMARY KEY AUTO_INCREMENT,
    EnvironmentName VARCHAR(100) NOT NULL,
    EnvironmentDescription TEXT,
    Hosts JSON
);
```
#### TestType_tbl

```sql
CREATE TABLE TestType (
    TestTypeId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestTypeName VARCHAR(100) NOT NULL,
    TestTypeDescription TEXT,
    TestTypeParameters JSON
);
```

#### Target_tbl

```sql
CREATE TABLE Target (
    TargetId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TargetName VARCHAR(255) NOT NULL,
    TargetURL VARCHAR(500),
    TargetType VARCHAR(50),
    TargetCategory VARCHAR(100)
);

```
#### BenchmarkResult_tbl

```sql
CREATE TABLE BenchmarkResult (
    BenchmarkResultId BIGINT PRIMARY KEY AUTO_INCREMENT,
    SystemUnderTestId BIGINT NOT NULL,
    DeploymentEnvironmentId BIGINT NOT NULL,
    BenchmarkConfiguration JSON,
    BenchmarkMetrics JSON,
    ExecutionDate DATETIME,
    FOREIGN KEY (SystemUnderTestId) REFERENCES SystemUnderTest(SystemUnderTestId),
    FOREIGN KEY (DeploymentEnvironmentId) REFERENCES DeploymentEnvironment(DeploymentEnvironmentId)
);
```
#### TestConfiguration_tbl

```sql
CREATE TABLE TestConfiguration (
    TestConfigurationId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestName VARCHAR(255) NOT NULL,
    TestDescription TEXT,
    TestTypeId BIGINT NOT NULL,
    TestScriptPath VARCHAR(500),
    TestDataPath VARCHAR(500),
    ConcurrentUsers INT,
    RampUpPeriod INT,
    LoopCount INT,
    TestDuration INT,
    EnvironmentId BIGINT NOT NULL,
    SystemUnderTestId BIGINT NOT NULL,
    TargetId BIGINT NOT NULL,
    TestTypeParameters JSON,
    FOREIGN KEY (TestTypeId) REFERENCES TestType(TestTypeId),
    FOREIGN KEY (EnvironmentId) REFERENCES DeploymentEnvironment(DeploymentEnvironmentId),
    FOREIGN KEY (SystemUnderTestId) REFERENCES SystemUnderTest(SystemUnderTestId),
    FOREIGN KEY (TargetId) REFERENCES Target(TargetId)
);
```
#### TestResult_tbl
```sql
CREATE TABLE TestResult (
    TestResultId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestName VARCHAR(255) NOT NULL,
    TestDate DATETIME,
    EnvironmentId BIGINT NOT NULL,
    ResponseTime JSON,
    Throughput DECIMAL(10,2),
    CpuUtilization DECIMAL(5,2),
    MemoryUtilization DECIMAL(5,2),
    NetworkUtilization DECIMAL(5,2),
    Errors INT,
    Warnings INT,
    TestConfigurationId BIGINT NOT NULL,
    SystemUnderTestId BIGINT NOT NULL,
    TargetId BIGINT NOT NULL,
    FOREIGN KEY (EnvironmentId) REFERENCES DeploymentEnvironment(DeploymentEnvironmentId),
    FOREIGN KEY (TestConfigurationId) REFERENCES TestConfiguration(TestConfigurationId),
    FOREIGN KEY (SystemUnderTestId) REFERENCES SystemUnderTest(SystemUnderTestId),
    FOREIGN KEY (TargetId) REFERENCES Target(TargetId)
);
```
#### ScheduledTest_tbl
```sql
CREATE TABLE ScheduledTest (
    ScheduledTestId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestConfigurationId BIGINT NOT NULL,
    ScheduledTime DATETIME,
    Recurrence VARCHAR(100),
    Status VARCHAR(50),
    FOREIGN KEY (TestConfigurationId) REFERENCES TestConfiguration(TestConfigurationId)
);
```
#### TestReport_tbl
```sql
CREATE TABLE TestReport (
    TestReportId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestResultId BIGINT NOT NULL,
    ReportFormat VARCHAR(50),
    ReportData LONGBLOB,
    ScheduledDistribution JSON,
    FOREIGN KEY (TestResultId) REFERENCES TestResult(TestResultId)
);
```
#### Create indexes on frequently queried columns
```sql
CREATE INDEX idx_TestResult_TestDate ON TestResult(TestDate);
CREATE INDEX idx_TestResult_Environment ON TestResult(EnvironmentId);
CREATE INDEX idx_TestResult_SystemUnderTest ON TestResult(SystemUnderTestId);
CREATE INDEX idx_TestResult_Target ON TestResult(TargetId);
```

