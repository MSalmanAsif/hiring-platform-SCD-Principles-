using System.Text.Json.Serialization;

namespace HiringPlatform.Models
{
    public class Application
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("jobId")]
        public string JobId { get; set; } = string.Empty;

        [JsonPropertyName("candidateId")]
        public string CandidateId { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = "applied";
    }
}