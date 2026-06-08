using System.Text.Json;
using HiringPlatform.Configuration;
using HiringPlatform.Interfaces;
using HiringPlatform.Models;
using Microsoft.Extensions.Options;

namespace HiringPlatform.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
//         private readonly string _filePath;
//         private readonly JsonSerializerOptions _readOptions;
//         private readonly JsonSerializerOptions _writeOptions;
        private readonly string _filePath;
        private readonly JsonSerializerOptions _readOptions;
        private readonly JsonSerializerOptions _writeOptions;

        public ApplicationRepository(IOptions<AppSettings> settings)
        {
            _filePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                settings.Value.DataDirectory,
                settings.Value.ApplicationsFile
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

        private List<Application> ReadAll()
        {
            if (!File.Exists(_filePath)) return new List<Application>();
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Application>>(json, _readOptions) ?? new List<Application>();
        }

        private void WriteAll(List<Application> apps)
        {
            File.WriteAllText(_filePath, JsonSerializer.Serialize(apps, _writeOptions));
        }

        public List<Application> GetAll() => ReadAll();
        public List<Application> GetByJobId(string jobId) => ReadAll().Where(a => a.JobId == jobId).ToList();
        public List<Application> GetByCandidateId(string candidateId) => ReadAll().Where(a => a.CandidateId == candidateId).ToList();
        public Application? GetById(string id) => ReadAll().FirstOrDefault(a => a.Id == id);

        public void Add(Application application)
        {
            var apps = ReadAll();
            apps.Add(application);
            WriteAll(apps);
        }

        public void Update(Application application)
        {
            var apps = ReadAll();
            var index = apps.FindIndex(a => a.Id == application.Id);
            if (index >= 0) { apps[index] = application; WriteAll(apps); }
        }
    }

    


//             // OLD CODE (hardcoded path — code smell: Magic String):
//             // private readonly string _filePath = "Data/jobs.json";
//             _filePath = Path.Combine(
//                 Directory.GetCurrentDirectory(),
//                 settings.Value.DataDirectory,
//                 settings.Value.JobsFile
//             );
//            _readOptions = new JsonSerializerOptions
// {
//     PropertyNameCaseInsensitive = true
// };
// _writeOptions = new JsonSerializerOptions
// {
//     WriteIndented = true
// };
//         }

//         // REFACTORED: Extracted ReadAll() and WriteAll() (Extract Method refactoring)
//         // OLD CODE (read logic duplicated in every method — code smell: Duplicated Code):
//         // public List<Job> GetAll()
//         // {
//         //     var json = File.ReadAllText("Data/jobs.json");
//         //     return JsonSerializer.Deserialize<List<Job>>(json) ?? new List<Job>();
//         // }
//         // public Job? GetById(string id)
//         // {
//         //     var json = File.ReadAllText("Data/jobs.json");
//         //     var jobs = JsonSerializer.Deserialize<List<Job>>(json) ?? new List<Job>();
//         //     return jobs.FirstOrDefault(j => j.Id == id);
//         // }

//         private List<Job> ReadAll()
//         {
//             if (!File.Exists(_filePath)) return new List<Job>();
//             var json = File.ReadAllText(_filePath);
//             return JsonSerializer.Deserialize<List<Job>>(json, _readOptions) ?? new List<Job>();
//         }

//         private void WriteAll(List<Job> jobs)
//         {
//             File.WriteAllText(_filePath, JsonSerializer.Serialize(jobs, _writeOptions));
//         }

//         public List<Job> GetAll() => ReadAll();
//         public Job? GetById(string id) => ReadAll().FirstOrDefault(j => j.Id == id);

//         public void Add(Job job)
//         {
//             var jobs = ReadAll();
//             jobs.Add(job);
//             WriteAll(jobs);
//         }

//         public void Update(Job job)
//         {
//             var jobs = ReadAll();
//             var index = jobs.FindIndex(j => j.Id == job.Id);
//             if (index >= 0) { jobs[index] = job; WriteAll(jobs); }
//         }

//         public void Delete(string id)
//         {
//             WriteAll(ReadAll().Where(j => j.Id != id).ToList());
//         }
}



//         private readonly string _filePath;
//         private readonly JsonSerializerOptions _readOptions;
//         private readonly JsonSerializerOptions _writeOptions;

//             // OLD CODE (hardcoded path — code smell: Magic String):
//             // private readonly string _filePath = "Data/jobs.json";
//             _filePath = Path.Combine(
//                 Directory.GetCurrentDirectory(),
//                 settings.Value.DataDirectory,
//                 settings.Value.JobsFile
//             );
//            _readOptions = new JsonSerializerOptions
// {
//     PropertyNameCaseInsensitive = true
// };
// _writeOptions = new JsonSerializerOptions
// {
//     WriteIndented = true
// };
//         }

//         // REFACTORED: Extracted ReadAll() and WriteAll() (Extract Method refactoring)
//         // OLD CODE (read logic duplicated in every method — code smell: Duplicated Code):
//         // public List<Job> GetAll()
//         // {
//         //     var json = File.ReadAllText("Data/jobs.json");
//         //     return JsonSerializer.Deserialize<List<Job>>(json) ?? new List<Job>();
//         // }
//         // public Job? GetById(string id)
//         // {
//         //     var json = File.ReadAllText("Data/jobs.json");
//         //     var jobs = JsonSerializer.Deserialize<List<Job>>(json) ?? new List<Job>();
//         //     return jobs.FirstOrDefault(j => j.Id == id);
//         // }

//         private List<Job> ReadAll()
//         {
//             if (!File.Exists(_filePath)) return new List<Job>();
//             var json = File.ReadAllText(_filePath);
//             return JsonSerializer.Deserialize<List<Job>>(json, _readOptions) ?? new List<Job>();
//         }

//         private void WriteAll(List<Job> jobs)
//         {
//             File.WriteAllText(_filePath, JsonSerializer.Serialize(jobs, _writeOptions));
//         }

//         public List<Job> GetAll() => ReadAll();
//         public Job? GetById(string id) => ReadAll().FirstOrDefault(j => j.Id == id);

//         public void Add(Job job)
//         {
//             var jobs = ReadAll();
//             jobs.Add(job);
//             WriteAll(jobs);
//         }

//         public void Update(Job job)
//         {
//             var jobs = ReadAll();
//             var index = jobs.FindIndex(j => j.Id == job.Id);
//             if (index >= 0) { jobs[index] = job; WriteAll(jobs); }
//         }

//         public void Delete(string id)
//         {
//             WriteAll(ReadAll().Where(j => j.Id != id).ToList());
//         }