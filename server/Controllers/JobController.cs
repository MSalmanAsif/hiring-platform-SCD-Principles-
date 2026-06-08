using HiringPlatform.Services;
using Microsoft.AspNetCore.Mvc;

namespace HiringPlatform.Controllers
{
    // REFACTORED: Controller only handles HTTP — no business logic (SRP)
    // OLD CODE (file reading + logic inside controller — code smell: Fat Controller):
    // [HttpGet]
    // public IActionResult GetAllJobs()
    // {
    //     var json = File.ReadAllText("Data/jobs.json");
    //     var jobs = JsonSerializer.Deserialize<List<Job>>(json);
    //     return Ok(jobs);
    // }
    [ApiController]
    [Route("api/jobs")]
    public class JobController : ControllerBase
    {
        private readonly JobService _jobService;

          // REFACTORED: Service injected not instantiated (DIP)
        // OLD CODE (service created with new keyword — code smell: Direct Dependency):
        // private readonly JobService _jobService = new JobService();
        public JobController(JobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public IActionResult GetAllJobs() =>
            Ok(_jobService.GetAllJobs());

        [HttpGet("{id}")]
        public IActionResult GetJob(string id)
        {
            var job = _jobService.GetJobById(id);
            if (job == null) return NotFound(new { message = "Job not found" });
            return Ok(job);
        }

        [HttpPost]
        public IActionResult PostJob([FromBody] PostJobRequest req)
        {
              // REFACTORED: Validation and creation moved to service (SRP)
            // OLD CODE (null check missing — code smell: Missing Guard Clause):
            // var job = _jobService.PostJob(...);
            // return Ok(job);   
            var job = _jobService.PostJob(req.Title, req.Description, req.Company, req.Location, req.RecruiterId);
            return StatusCode(201, job);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJob(string id, [FromBody] UpdateJobRequest req)
        {
            var success = _jobService.UpdateJob(id, req.Title, req.Description, req.Company, req.Location);
            if (!success) return NotFound(new { message = "Job not found" });
            return Ok(new { message = "Job updated" });
        }

        [HttpPut("{id}/toggle")]
        public IActionResult ToggleStatus(string id)
        {
            var success = _jobService.ToggleJobStatus(id);
            if (!success) return NotFound(new { message = "Job not found" });
            return Ok(new { message = "Job status toggled" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteJob(string id)
        {
            var success = _jobService.DeleteJob(id);
            if (!success) return NotFound(new { message = "Job not found" });
            return Ok(new { message = "Job deleted" });
        }
    }

    public record PostJobRequest(string Title, string Description, string Company, string Location, string RecruiterId);
    public record UpdateJobRequest(string Title, string Description, string Company, string Location);
}