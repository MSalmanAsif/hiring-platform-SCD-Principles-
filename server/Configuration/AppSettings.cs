namespace HiringPlatform.Configuration
{
    // Configuration Management — SCD Principle
    // All config values come from appsettings.json, not hardcoded
    public class AppSettings
    {
        public string DataDirectory { get; set; } = string.Empty;
        public string UsersFile { get; set; } = string.Empty;
        public string JobsFile { get; set; } = string.Empty;
        public string ApplicationsFile { get; set; } = string.Empty;
        public string AllowedOrigin { get; set; } = string.Empty;
    }
}