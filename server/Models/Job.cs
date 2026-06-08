using System.Text.Json.Serialization;

namespace HiringPlatform.Models
{
    public class Job
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("company")]
        public string Company { get; set; } = string.Empty;

        [JsonPropertyName("location")]
        public string Location { get; set; } = string.Empty;

        [JsonPropertyName("recruiterId")]
        public string RecruiterId { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = "open";
    }
}