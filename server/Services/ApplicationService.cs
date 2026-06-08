using HiringPlatform.Interfaces;
using HiringPlatform.Models;

namespace HiringPlatform.Services
{
    // SRP — only responsible for Application business logic
    // DIP — depends on IApplicationRepository abstraction
    public class ApplicationService
    {
        private readonly IApplicationRepository _applicationRepository;

        public ApplicationService(IApplicationRepository applicationRepository)
        {
            _applicationRepository = applicationRepository;
        }

        private string GenerateId(string prefix = "app")
        {
            return $"{prefix}-{Guid.NewGuid().ToString().Substring(0, 8)}";
        }

        public List<Application> GetAllApplications() => _applicationRepository.GetAll();

        public List<Application> GetApplicationsByJob(string jobId) => 
            _applicationRepository.GetByJobId(jobId);

        public List<Application> GetApplicationsByCandidate(string candidateId) =>
            _applicationRepository.GetByCandidateId(candidateId);

        public Application? ApplyForJob(string jobId, string candidateId)
        {
            // Validation — prevent duplicate applications
            var existing = _applicationRepository.GetByJobId(jobId)
                .FirstOrDefault(a => a.CandidateId == candidateId);
            
            if (existing != null)
                return null; // Already applied

            var application = new Application
            {
                Id = GenerateId(),
                JobId = jobId,
                CandidateId = candidateId,
                Status = "applied"
            };

            _applicationRepository.Add(application);
            return application;
        }

        public bool UpdateApplicationStatus(string applicationId, string newStatus)
        {
            var application = _applicationRepository.GetById(applicationId);
            if (application == null) return false;

            // REFACTORED: Valid status list extracted as array (Replace Magic String)
            // OLD CODE (status checked with chained if/else — code smell: Magic Strings):
            // if (newStatus != "applied" && newStatus != "shortlisted"
            //     && newStatus != "interview" && newStatus != "rejected")
            //     return BadRequest("invalid");

            // Validation — valid statuses
            var validStatuses = new[] { "applied", "shortlisted", "interview", "rejected" };
            if (!validStatuses.Contains(newStatus)) return false;

            application.Status = newStatus;
            _applicationRepository.Update(application);
            return true;
        }
    }
}