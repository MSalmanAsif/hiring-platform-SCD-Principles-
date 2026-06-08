using System.Text.Json;
using HiringPlatform.Configuration;
using HiringPlatform.Interfaces;
using HiringPlatform.Models;
using Microsoft.Extensions.Options;

namespace HiringPlatform.Repositories
{
    public class JobRepository : IJobRepository
    {

        private readonly string _filePath;
        private readonly JsonSerializerOptions _readOptions;
        private readonly JsonSerializerOptions _writeOptions;

        public JobRepository(IOptions<AppSettings> settings)
        {
          // REFACTORED: Path from appsettings.json (Configuration Management)
            // OLD CODE (hardcoded path — code smell: Magic String):
            // private readonly string _filePath = "Data/jobs.json";
            _filePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                settings.Value.DataDirectory,
                settings.Value.JobsFile
            );
           _readOptions = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
_writeOptions = new JsonSerializerOptions
{
    WriteIndented = true
};
        }

        // REFACTORED: Extracted ReadAll() and WriteAll() (Extract Method refactoring)
        // OLD CODE (read logic duplicated in every method — code smell: Duplicated Code):
        // public List<Job> GetAll()
        // {
        //     var json = File.ReadAllText("Data/jobs.json");
        //     return JsonSerializer.Deserialize<List<Job>>(json) ?? new List<Job>();
        // }
        // public Job? GetById(string id)
        // {
        //     var json = File.ReadAllText("Data/jobs.json");
        //     var jobs = JsonSerializer.Deserialize<List<Job>>(json) ?? new List<Job>();
        //     return jobs.FirstOrDefault(j => j.Id == id);
        // }

        private List<Job> ReadAll()
        {
            if (!File.Exists(_filePath)) return new List<Job>();
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Job>>(json, _readOptions) ?? new List<Job>();
        }

        private void WriteAll(List<Job> jobs)
        {
            File.WriteAllText(_filePath, JsonSerializer.Serialize(jobs, _writeOptions));
        }

        public List<Job> GetAll() => ReadAll();
        public Job? GetById(string id) => ReadAll().FirstOrDefault(j => j.Id == id);

        public void Add(Job job)
        {
            var jobs = ReadAll();
            jobs.Add(job);
            WriteAll(jobs);
        }

        public void Update(Job job)
        {
            var jobs = ReadAll();
            var index = jobs.FindIndex(j => j.Id == job.Id);
            if (index >= 0) { jobs[index] = job; WriteAll(jobs); }
        }

        public void Delete(string id)
        {
            WriteAll(ReadAll().Where(j => j.Id != id).ToList());
        }
    }
}