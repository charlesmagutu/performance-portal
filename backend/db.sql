
CREATE TABLE SystemUnderTest_tb (
    SystemUnderTestId BIGINT PRIMARY KEY AUTO_INCREMENT,
    SystemName VARCHAR(255) NOT NULL,
    SystemDescription TEXT,
    SystemVersion VARCHAR(50),
    SystemType VARCHAR(50),
    DeploymentEnvironmentId BIGINT,
    FOREIGN KEY (DeploymentEnvironmentId) REFERENCES DeploymentEnvironment(DeploymentEnvironmentId)
);

CREATE TABLE DeploymentEnvironment (
    DeploymentEnvironmentId BIGINT PRIMARY KEY AUTO_INCREMENT,
    EnvironmentName VARCHAR(100) NOT NULL,
    EnvironmentDescription TEXT,
    Hosts JSON
);

CREATE TABLE TestType (
    TestTypeId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestTypeName VARCHAR(100) NOT NULL,
    TestTypeDescription TEXT,
    TestTypeParameters JSON
);

CREATE TABLE Target (
    TargetId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TargetName VARCHAR(255) NOT NULL,
    TargetURL VARCHAR(500),
    TargetType VARCHAR(50),
    TargetCategory VARCHAR(100)
);

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


CREATE TABLE ScheduledTest (
    ScheduledTestId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestConfigurationId BIGINT NOT NULL,
    ScheduledTime DATETIME,
    Recurrence VARCHAR(100),
    Status VARCHAR(50),
    FOREIGN KEY (TestConfigurationId) REFERENCES TestConfiguration(TestConfigurationId)
);

CREATE TABLE TestReport (
    TestReportId BIGINT PRIMARY KEY AUTO_INCREMENT,
    TestResultId BIGINT NOT NULL,
    ReportFormat VARCHAR(50),
    ReportData LONGBLOB,
    ScheduledDistribution JSON,
    FOREIGN KEY (TestResultId) REFERENCES TestResult(TestResultId)
);

CREATE INDEX idx_TestResult_TestDate ON TestResult(TestDate);
CREATE INDEX idx_TestResult_Environment ON TestResult(EnvironmentId);
CREATE INDEX idx_TestResult_SystemUnderTest ON TestResult(SystemUnderTestId);
CREATE INDEX idx_TestResult_Target ON TestResult(TargetId);