using HiringPlatform.Interfaces;
using HiringPlatform.Models;

namespace HiringPlatform.Services
{
    
    // public IActionResult PostJob([FromBody] PostJobRequest req)
    // {
    //     var json = File.ReadAllText("Data/jobs.json");
    //     var jobs = JsonSerializer.Deserialize<List<Job>>(json);
    //     var job = new Job { Id = Guid.NewGuid().ToString(), Title = req.Title, Status = "open", ... };
    //     jobs.Add(job);
    //     File.WriteAllText("Data/jobs.json", JsonSerializer.Serialize(jobs));
    //     return Ok(job);
    // }
    public class JobService
    {
        private readonly IJobRepository _jobRepository;


        // (concrete class instantiated inside service code smell: Direct Dependency):
        // private readonly JobRepository _jobRepository = new JobRepository();

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

         // (Guid inline in every method — code smell: Duplicated Code):
        // var job = new Job { Id = Guid.NewGuid().ToString().Substring(0, 8), ... }

        private string GenerateId(string prefix = "job")
        {
            return $"{prefix}-{Guid.NewGuid().ToString().Substring(0, 8)}";
        }

        public List<Job> GetAllJobs() => _jobRepository.GetAll();

        public Job? GetJobById(string id) => _jobRepository.GetById(id);

        public Job? PostJob(string title, string description, string company, string location, string recruiterId)
        {
            var job = new Job
            {
                Id = GenerateId(),
                Title = title,
                Description = description,
                Company = company,
                Location = location,
                RecruiterId = recruiterId,
                Status = "open"
            };

            _jobRepository.Add(job);
            return job;
        }

        public bool UpdateJob(string jobId, string title, string description, string company, string location)
        {
            var job = _jobRepository.GetById(jobId);
            if (job == null) return false;

            job.Title = title;
            job.Description = description;
            job.Company = company;
            job.Location = location;
            _jobRepository.Update(job);
            return true;
        }

        public bool ToggleJobStatus(string jobId)
        {
            var job = _jobRepository.GetById(jobId);
            if (job == null) return false;

            job.Status = job.Status == "open" ? "closed" : "open";
            _jobRepository.Update(job);
            return true;
        }

        public bool DeleteJob(string jobId)
        {
            var job = _jobRepository.GetById(jobId);
            if (job == null) return false;
            _jobRepository.Delete(jobId);
            return true;
        }
    }
}