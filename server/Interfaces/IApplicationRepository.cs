using HiringPlatform.Models;

namespace HiringPlatform.Interfaces
{
    public interface IApplicationRepository
    {
        // List<Job> GetAll();
        // Job? GetById(string id);
        // void Add(Job job);
        // void Update(Job job);
        // void Delete(string id);
        List<Application> GetAll();
        List<Application> GetByJobId(string jobId);
        List<Application> GetByCandidateId(string candidateId);
        Application? GetById(string id);
        void Add(Application application);
        void Update(Application application);
    }
}