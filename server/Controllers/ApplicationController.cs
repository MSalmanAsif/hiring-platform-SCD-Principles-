using HiringPlatform.Services;
using Microsoft.AspNetCore.Mvc;

namespace HiringPlatform.Controllers
{
    [ApiController]
    [Route("api/applications")]
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationService _applicationService;

        public ApplicationController(ApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet]
        public IActionResult GetAll() =>
            Ok(_applicationService.GetAllApplications());

        [HttpGet("job/{jobId}")]
        public IActionResult GetByJob(string jobId) =>
            Ok(_applicationService.GetApplicationsByJob(jobId));

        [HttpGet("candidate/{candidateId}")]
        public IActionResult GetByCandidate(string candidateId) =>
            Ok(_applicationService.GetApplicationsByCandidate(candidateId));

        [HttpPost]
        public IActionResult Apply([FromBody] ApplyRequest req)
        {
            var application = _applicationService.ApplyForJob(req.JobId, req.CandidateId);
            if (application == null) return BadRequest(new { message = "Already applied" });
            return StatusCode(201, application);
        }

        [HttpPut("{id}/status")]
        public IActionResult UpdateStatus(string id, [FromBody] StatusRequest req)
        {
            var success = _applicationService.UpdateApplicationStatus(id, req.Status);
            if (!success) return BadRequest(new { message = "Invalid status or application not found" });
            return Ok(new { message = "Status updated", status = req.Status });
        }
    }

    public record ApplyRequest(string JobId, string CandidateId);
    public record StatusRequest(string Status);
}